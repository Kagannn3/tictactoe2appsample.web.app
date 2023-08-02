import React, { useState, useEffect } from 'react';

const TicTacToeBoard = ({ handleLeaderboard, setGameResult }) => {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = () => {
    // Check rows, columns, and diagonals for a win
    const winPatterns = [
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
        setWinner(board[a[0]][a[1]]);
        setGameOver(true);
        return;
      }
    }

    // Check for a draw
    if (board.every((row) => row.every((cell) => cell !== null))) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    checkWinner();
    
    // Game result handling when the game is over
    if (gameOver) {
      if (winner === 'X') {
        setGameResult('win'); // Set the game result using setGameResult
      } else if (winner === 'O') {
        setGameResult('defeat'); // Set the game result using setGameResult
      } else {
        setGameResult('draw'); // Set the game result using setGameResult
      }
      handleLeaderboard({ preventDefault: () => {}, gameResult:winner});
    }
  }, [board, checkWinner, gameOver, winner, handleLeaderboard, setGameResult]);

  const makeMove = (row, col) => {
    if (!board[row][col] && !gameOver) {
      const newBoard = board.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? player : cell
        )
      );
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const restartGame = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  const aiMove = () => {
    if (!gameOver) {
      // Find all available empty cells
      const emptyCells = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            emptyCells.push([i, j]);
          }
        }
      }

      // Choose a random empty cell for AI move
      if (emptyCells.length > 0) {
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(row, col);
      }
    }
  };

  useEffect(() => {
    // Make AI move after player makes a move
    if (player === 'O') {
      aiMove();
    }
  }, [player, aiMove]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {winner ? <h2>{winner} wins!</h2> : gameOver ? <h2>It's a draw!</h2> : <h2>Player {player}'s turn</h2>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: '90px',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid black',
                    fontSize: '30px',
                    cursor: cell || gameOver ? 'not-allowed' : 'pointer',
                    backgroundColor: cell === 'X' ? '#208c98' : cell === 'O' ? '#0346d6' : 'transparent',
                    color: cell === 'X' || cell === 'O' ? 'white' : 'black',
                  }}
                  onClick={() => makeMove(rowIndex, colIndex)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          style={{
            backgroundColor: '#208c98',
            color: 'white',
            border: '2px solid white',
            fontSize: '15px',
            width: '100px',
            height: '35px',
            borderRadius: '10%',
            cursor: 'pointer',
          }}
          onClick={restartGame}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default TicTacToeBoard;
