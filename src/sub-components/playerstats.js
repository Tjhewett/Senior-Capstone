import React, { useState, useEffect } from 'react';
import '../styles/playerstats.css'

const PlayerStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fetch data from your Flask API
    fetch('http://127.0.0.1:5000/api/get_data')
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>NFL Player Stats</h2>
      <h2>Passing Yards</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Yards</th>
            <th>Attempts</th>
            <th>Completions</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.player}</td>
              <td>{stat.yards}</td>
              <td>{stat.attempts}</td>
              <td>{stat.completions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStats;

