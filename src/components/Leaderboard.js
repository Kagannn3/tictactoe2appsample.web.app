import React from 'react';

const Leaderboard = () => {
  // Create an example leaderboard data (you can fetch data from a server in a real app)
  const leaderboardData = [
    { name: 'Player 1', wins: 5 },
    { name: 'Player 2', wins: 3 },
    { name: 'Player 3', wins: 2 },
  ];

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
