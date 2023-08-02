import React, { useState, useEffect } from 'react';
import TicTacToeBoard from './Gameboard';

const Newpage = () => {
  const [showgameContent, setShowgameContent] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameResult, setGameResult]=useState(null);
  const [playerStatistics, setPlayerStatistics] = useState({
    wins: 0,
    defeats: 0,
    totalGames: 0,
    histGame:[],
  });
   

   

   

  const updatePlayerStatistics = (gameResult) => {
    setPlayerStatistics((playerStatistics) => ({
      ...playerStatistics,
      wins: gameResult === 'win' ? playerStatistics.wins + 1 : playerStatistics.wins,
      defeats: gameResult === 'defeat' ? playerStatistics.defeats + 1 : playerStatistics.defeats,
      totalGames: playerStatistics.totalGames + 1,
      histGame: [...playerStatistics.histGame, { date: new Date(), gameResult }],
    }));
    return;
    
  };
  
    
  

  useEffect(() => {
    localStorage.setItem('playerStatistics', JSON.stringify(playerStatistics));
  }, [playerStatistics]);

  useEffect(() => {
    const storedPlayerStatistics = JSON.parse(localStorage.getItem('playerStatistics'));
    if (storedPlayerStatistics) {
      setPlayerStatistics(storedPlayerStatistics);
    }
  }, []);

  const handleGameClick = (event) => {
    event.preventDefault();
    setShowgameContent(true);
    setShowLeaderboard(false);
  };

  const handleLeaderboard = (event) => {
    event.preventDefault();
    setShowLeaderboard(true);
    setShowgameContent(false);
    updatePlayerStatistics(gameResult);
  }
  

  const handleLogout = (event) => {
    event.preventDefault();
    // Log out and reset player statistics
    setPlayerStatistics({
      wins: 0,
      defeats: 0,
      totalGames: 0,
    });
    // Redirect to sign-in page
    window.location.href='/signin';
  };
  

  return (
    <div>
      <div style={{ position: 'absolute', top: '70px', left: '150px' }}>
        <b>Tic Tac Toe</b>
      </div>
      <div
        style={{ position: 'absolute', top: '70px', left: '700px', cursor: 'pointer' }}
        onClick={handleGameClick}
      >
        <b>Game</b>
      </div>
      <div 
        style={{ position: 'absolute', top: '70px', left: '850px', cursor: 'pointer' }}
        onClick={handleLeaderboard}
      >
        <b>Leaderboard</b>
      </div>
      <div>
      
      </div>
      <button
        style={{
          backgroundColor: '#208c98',
          color: 'white',
          position: 'absolute',
          top: '70px',
          left: '1060px',
          border: '2px solid white',
          fontSize: '15px',
          width: '100px',
          height: '35px',
          borderRadius: '10%',
        }}
        onMouseEnter={(event) => {
          event.target.style.backgroundColor = '#0346d6';
        }}
        onMouseLeave={(event) => {
          event.target.style.backgroundColor = '#208c98';
        }}
        onClick={handleLogout}
      >
        Log Out
      </button>

      {showgameContent && <TicTacToeBoard handleLeaderboard={handleLeaderboard} setGameResult={setGameResult}/> }

      {showLeaderboard && (
        <div
          style={{
            position: 'absolute',
            top: '150px',
            left: '300px',
            width: '600px',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '23px' }}>Leaderboard</h2>
          <table id='leaderboard'
            style={{
              width: '90%',
              textAlign: 'center',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '12px' }}>Statistic</th>
                <th style={{ border: '1px solid #ccc', padding: '12px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>Wins</td>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>{playerStatistics.wins}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>Defeats</td>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>{playerStatistics.defeats}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>Total Games</td>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>{playerStatistics.totalGames}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>Game History</td>
                <td style={{ border: '1px solid #ccc', padding: '12px', maxHeight: '200px', overflowY: 'auto' }}>
            <ul>
              {playerStatistics.histGame.map((game, index) => (
                <li key={index}>
                  {game.gameResult === 'win'
                    ? 'Game ended in a win'
                    : game.gameResult === 'defeat'
                    ? 'Game ended in a defeat'
                    : 'Game ended in a draw'} - {new Date(game.date).toLocaleString()}
                </li>
              ))}
            </ul>
          </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Newpage;
