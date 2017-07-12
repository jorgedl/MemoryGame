import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import { BASE_ELEMENTS } from '../data/game-elements';

@autobind
export default class GameStore {
  @observable cards;
  @observable score;

  constructor() {
    this.cards = [];
    this.selectedCards = [];
    this.previousSelect = null;
    this.waiting = false;
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
    const card = {
      type: target.getAttribute('type'),
      value: target.getAttribute('value'),
      selected: target.getAttribute('data-selected')
    };

    if (card.selected === 'true' || this.selectedCards.length === 2 || this.waiting) {
      return;
    }

    this.selectCard(card);
    this.selectedCards.push(card);

    if (this.selectedCards.length < 2) {
      return;
    }

    const correct = this.selectedCards[0].value === this.selectedCards[1].value;
    if (correct) {
      this.score.points = this.score.points + 1;
      this.setCorrectCards();
      this.selectedCards = [];
    } else {
      this.setWrongCards(this.selectedCards);
      this.waiting = true;
      setTimeout(() => {
        this.unselectCard(this.selectedCards[0]);
        this.unselectCard(this.selectedCards[1]);
        this.selectedCards = [];
        this.waiting = false;
      }, 2000);
    }
    this.score.attempts = this.score.attempts + 1;
  }

  setWrongCards(cards) {
    this.cards = this.cards.map((c) => {
      const retCard = c;
      retCard.wrong = !!cards.filter(t => t.value === c.value && t.type === c.type).length;
      return retCard;
    });
  }

  setCorrectCards() {
    this.cards = this.cards.map((c) => {
      const retCard = c;
      retCard.correct = c.selected;
      return retCard;
    });
  }

  selectCard(card) {
    this.cards = this.cards.map((c) => {
      const retCard = c;
      retCard.selected = c.selected || (c.value === card.value && c.type === card.type);
      return retCard;
    });
  }

  unselectCard(card) {
    this.cards = this.cards.map((c) => {
      const retCard = c;
      retCard.wrong = false;
      retCard.selected = !(!c.selected || (c.value === card.value && c.type === card.type));
      return retCard;
    });
  }

  unselectAll() {
    this.cards = this.cards.map((c) => {
      const retCard = c;
      retCard.wrong = false;
      retCard.correct = false;
      retCard.selected = false;
      return retCard;
    });
  }

  selectAll() {
    this.cards = this.cards.map((c) => {
      const retCard = c;
      retCard.selected = true;
      return retCard;
    });
  }

  restartGame() {
    if (!this.score.attempts || this.waiting) {
      return;
    }
    this.getElements();
    this.score = {
      points: 0,
      attempts: 0
    };
  }

}
