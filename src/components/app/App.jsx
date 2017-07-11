import React from 'react';
import Game from './Game';
import ScorePanel from './ScorePanel';

const App = () => (
  <div className="main-app">
    <ScorePanel />
    <Game />
  </div>
);

export default App;
