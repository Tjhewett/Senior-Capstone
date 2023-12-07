from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class NFLStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String(100), unique=True)  # Add unique constraint so that the data isn't repeated in the database.
    yards = db.Column(db.Float)
    attempts = db.Column(db.Float)
    completions = db.Column(db.Float)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    location = db.Column(db.String(50), nullable=False)

def fetch_and_store_data():
    try:
        # Scraping data from the URL
        url = 'https://www.nfl.com/stats/player-stats/category/passing/2023/reg/all/passingyards/desc'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extracting data from the table and storing it in the database
        table = soup.find('table')
        rows = table.find_all('tr')[1:]  # Skip the header row

        for row in rows:
            columns = row.find_all('td')
            player = columns[0].text.strip()
            yards = float(columns[1].text.strip())
            attempts = float(columns[3].text.strip())
            completions = float(columns[4].text.strip())

            # Check if entry with the same player name already exists
            existing_entry = NFLStats.query.filter_by(player=player).first()

            if not existing_entry:
                # Store data in the database
                entry = NFLStats(player=player, yards=yards, attempts=attempts, completions=completions)
                db.session.add(entry)
            else:
                print('This data has already been added to the db')

        db.session.commit()
        print('Data fetched and stored successfully!')
    except Exception as e:
        # Log the error
        print(f'Error fetching and storing data: {e}')

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    location = data.get('location')

    # Check if user already exists
    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return jsonify({'error': 'User already exists'}), 400

    # Create a new user
    new_user = User(email=email, password=password, username=username, location=location)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/check_user', methods=['POST'])
def check_user():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')

    # Check if user already exists
    user_exists = User.query.filter((User.email == email) | (User.username == username)).first() is not None

    return jsonify({'exists': user_exists})

@app.route('/api/get_data')
def get_data():
    data = NFLStats.query.all()
    entries = [{'player': entry.player, 'yards': entry.yards, 'attempts': entry.attempts, 'completions': entry.completions} for entry in data]
    return jsonify(entries)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        fetch_and_store_data()  # Call the function to fetch and store data
    app.run(debug=True)

