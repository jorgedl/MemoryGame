import React, { PureComponent, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import './score-panel.less';

const TITLE = 'Painel de pontuação';

@inject('gameStore')
@observer
class ScorePanel extends PureComponent {

  didWin() {
    const { gameStore } = this.props;
    const { score } = gameStore;
    const { points, attempts } = score;
    if (points >= 6) {
      return (<div>Parabéns você venceu com {attempts} <br />tentativas!</div>);
    }
    return (
      <div>
        <span>Tentativas: {attempts}</span><br />
        <span>Combinações corretas: {points}</span><br />
      </div>);
  }

  render() {
    const { gameStore } = this.props;
    return (
      <div className="score-panel">
        <h2>{TITLE}</h2>
        { this.didWin() }
        <button className="reset-button" onClick={gameStore.restartGame}>Reiniciar Jogo</button>
      </div>);
  }
}

ScorePanel.propTypes = {
  gameStore: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ScorePanel;
