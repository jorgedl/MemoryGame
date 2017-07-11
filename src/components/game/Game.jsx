import React, { PureComponent, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import GameCard from './GameCard';
import './game.less';

@inject('gameStore')
@observer
class Game extends PureComponent {

  componentWillMount() {
    const { gameStore } = this.props;
    gameStore.getElements();
  }

  render() {
    const { gameStore } = this.props;
    const { cards } = gameStore;
    return (
      <ul className="game">
        { cards.map(card =>
          <GameCard
            key={`${card.value}${card.type}`}
            selected={card.selected}
            value={card.value}
            onClick={gameStore.cardClick}
            icon={card.icon}
            type={card.type}
          />) }
      </ul>
    );
  }
}

Game.propTypes = {
  gameStore: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Game;
