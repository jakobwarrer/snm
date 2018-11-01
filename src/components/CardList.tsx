import React, { Component, ReactText } from 'react';
import { Card, Cards, Sets } from 'scryfall-sdk';

import MTGCard from './Card';

class MTGCardList extends Component<any, { setCards: Card[] }> {
  interval: any;
  constructor(props) {
    super(props);
    this.state = { setCards: [] };
  }

  componentDidMount() {
    this.getAllCards();
  }

  componentWillUnmount() {
    // this.stop();
  }
  getAllCards() {
    let promises = [];
    Sets.byCode("grn")
      .then(set => set.card_count)
      .then((count: number) => {
        let step: number = 1;
        this.getSingleCard(step, count);
      });
  }

  private getSingleCard(step: number, count: number) {
    if (!localStorage.getItem(step.toString())) {
      return Cards.bySet("grn", step)
        .then(card => {
          this.setState({ setCards: [...this.state.setCards, card] });
          localStorage.setItem(step.toString(), JSON.stringify(card));
        })
        .then(() => {
          if (step < count) {
            this.getSingleCard(step + 1, count);
          }
        });
    } else {
      this.getStoredCard(step).then(() => {
        if (step < count) {
          this.getSingleCard(step + 1, count);
        }
      });
    }
  }

  private getStoredCard(step: number) {
    return new Promise(resolve => {
      this.setState(
        {
          setCards: [
            ...this.state.setCards,
            JSON.parse(localStorage.getItem(step.toString()))
          ]
        },
        () => resolve("Done")
      );
    });
  }

  render() {
    return (
      <div className="Card_list">
        {this.state.setCards
          ? this.state.setCards.map((singleCard, i) => {
              return <MTGCard key={i} card={singleCard} />;
            })
          : "Loading"}
      </div>
    );
  }
}

export default MTGCardList;