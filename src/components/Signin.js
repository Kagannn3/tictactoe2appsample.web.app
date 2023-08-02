import React, { useState } from 'react';


const Signin = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNickname('');
    setPassword('');
    window.location.href='/newpage';
    
  };

  return (
    <div className="small-background-color">
      <h2>Tic Tac Toe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            required
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="button"
            style={{
              width: '80px',
              height: '30px',
              backgroundColor: '#0e0546',
              color: 'white',
              borderRadius: '10%',
              borderColor: 'white',
              boxShadow: 'initial',
              marginTop: '50px',
              marginLeft: '0px',
            }}
            onMouseEnter={(event) => {
              event.target.style.backgroundColor = 'blue';
            }}
            onMouseLeave={(event) => {
              event.target.style.backgroundColor = 'darkblue';
            }}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
