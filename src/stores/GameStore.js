import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import { BASE_ELEMENTS } from '../data/game-elements';

@autobind
export default class GameStore {
  @observable cards;
  @observable score;

  constructor() {
    this.cards = [];
    this.previousSelect = null;
    this.score = {
      points: 0,
      attempts: 0
    };
  }

  getElements() {
    const shuffleArray = arr => arr.sort(() => (Math.random() - 0.5));
    const straightCards = [];
    this.cards.clear();
    shuffleArray(BASE_ELEMENTS).forEach((element, i) => {
      if (i < 6) {
        straightCards.push(Object.assign({ type: '1', selected: true }, element), Object.assign({ type: '2', selected: true }, element));
      }
    });
    shuffleArray(straightCards).forEach(card => this.cards.push(card));
    setTimeout(this.unselectAll, 3000);
  }

  cardClick(e) {
    const target = e.currentTarget;
    const selected = {
      type: target.getAttribute('type'),
      value: target.getAttribute('value'),
      selected: target.getAttribute('data-selected')
    };
    if (selected.selected === 'true') {
      return;
    }
    let previousSelect = this.previousSelect;
    if (previousSelect) {
      const correct = selected.value === previousSelect.value;
      if (correct) {
        this.selectCard(selected);
        this.score.points = this.score.points + 1;
      } else {
        this.unselectCard();
      }
      this.score.attempts = this.score.attempts + 1;
      previousSelect = null;
    } else {
      this.selectCard(selected);
      previousSelect = {
        type: target.getAttribute('type'),
        value: target.getAttribute('value')
      };
    }
    this.previousSelect = previousSelect;
  }

  selectCard(selected) {
    this.cards = this.cards.map((c) => {
      const card = c;
      card.selected = card.selected || (card.value === selected.value && card.type === selected.type);
      return card;
    });
  }

  unselectCard() {
    const previousSelect = this.previousSelect;
    this.cards = this.cards.map((c) => {
      const card = c;
      card.selected = !(!card.selected || (card.value === previousSelect.value && card.type === previousSelect.type));
      return card;
    });
  }

  unselectAll() {
    this.cards = this.cards.map((c) => {
      const card = c;
      card.selected = false;
      return card;
    });
  }

  selectAll() {
    this.cards = this.cards.map((c) => {
      const card = c;
      card.selected = true;
      return card;
    });
  }

  restartGame() {
    this.getElements();
    this.score = {
      points: 0,
      attempts: 0
    };
  }

}
