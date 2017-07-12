/* eslint jsx-a11y/no-static-element-interactions: off */
/* eslint react/forbid-prop-types: off */
import React, { PureComponent, PropTypes } from 'react';

class GameCard extends PureComponent {

  render() {
    const { icon, value, onClick, selected, type, wrong, correct } = this.props;
    return (
      <li className={`game-card ${wrong ? '-wrong' : ''} ${correct ? '-correct' : ''}`} onClick={onClick} value={value} type={type} data-selected={selected}>
        <i className="mi">{selected ? icon : 'https'}</i>
      </li>
    );
  }
}

GameCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  wrong: PropTypes.bool,
  correct: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

GameCard.defaultProps = {
  selected: false,
  wrong: false,
  correct: false
};

export default GameCard;
