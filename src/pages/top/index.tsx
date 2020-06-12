import React from 'react';

const Top = () => {
  const start = () => {
    console.log("Start!!!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>nousagi</h1>
        <button className="btn btn-primary" onClick={() => start()}>Start!!!</button>
      </header>
    </div>
  );
};

export default Top;
