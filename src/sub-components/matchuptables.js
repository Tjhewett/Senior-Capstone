import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/matchuptables.css'

const Matchuptables = () => {
  // Mock data for matchups and betting options
  const matchups = [
    { id: 1, team1: 'Team A', team2: 'Team B' },
    { id: 2, team1: 'Team C', team2: 'Team D' },
    { id: 3, team1: 'Team E', team2: 'Team F' },
    // Add more matchups as needed
  ];

  const bettingOptions = [
    { id: 1, type: 'Moneyline', odds: '+150 / -170' },
    { id: 2, type: 'Spread', odds: '-3.5 / +3.5' },
    // Add more betting options as needed
  ];

  

  return (
    <div className="container mt-5">
      <h2>Matchups</h2>
      <table className="table1">
        <thead>
          <tr>
            <th>Matchup</th>
            <th>Moneyline</th>
            <th>Spread</th>
            {/* Add more betting option headers as needed */}
          </tr>
        </thead>
        <tbody>
          {matchups.map(matchup => (
            <tr key={matchup.id}>
              <td>{`${matchup.team1} vs ${matchup.team2}`}</td>
              <td>{bettingOptions[0].odds}</td>
              <td>{bettingOptions[1].odds}</td>
              {/* Add more cells for additional betting options */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matchuptables;
