import React from 'react';
import Game from './game/Game';
import ScorePanel from './game/score-panel/ScorePanel';

const App = () => (
  <div className="main-app">
    <ScorePanel />
    <Game />
  </div>
);

export default App;
