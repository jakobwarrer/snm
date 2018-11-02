import React, { Component, MouseEventHandler, ReactText } from 'react';
import { Card, Cards, Sets } from 'scryfall-sdk';

import MTGCard from './Card';

class MTGCardList extends Component<
  any,
  { setCards: Card[]; shownCards: Card[]; filters: any }
> {
  interval: any;
  constructor(props) {
    super(props);
    this.state = {
      setCards: [],
      shownCards: [],
      filters: {
        color: [],
        mana: []
      }
    };
    this.filterCards = this.filterCards.bind(this);
    let filter = [];
  }

  componentDidMount() {
    var jsonData = require("../grn.json");
    // this.getAllCards();
    this.setState(
      {
        setCards: jsonData
      },
      () => {
        this.setState({
          shownCards: this.state.setCards
        });
      }
    );
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
      setTimeout(() => {
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
      }, 50);
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

  // setFilterColor(color: string){
  //   let colors = [];
  //   this.filter.push()
  //   this.setState({
  //     filters:
  //   })
  // }

  setFilterMana(mana: string) {}

  filterCards(color: "W" | "B" | "R" | "U" | "G") {
    let filteredList = this.state.setCards.filter(cards => {
      let cardColors = cards.colors;
      return cardColors.indexOf(color) > -1;
    });
    this.setState({
      shownCards: filteredList
    });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.filterCards("W")}>White</button>
          <button onClick={() => this.filterCards("U")}>Blue</button>
          <button onClick={() => this.filterCards("B")}>Black</button>
          <button onClick={() => this.filterCards("G")}>Green</button>
          <button onClick={() => this.filterCards("R")}>Red</button>
        </div>
        <div>
          {/* <button onClick={() => this.filterCards("1")}>1</button>
          <button onClick={() => this.filterCards("2")}>2</button>
          <button onClick={() => this.filterCards("3")}>3</button>
          <button onClick={() => this.filterCards("4")}>4</button>
          <button onClick={() => this.filterCards("5")}>5</button>
          <button onClick={() => this.filterCards("65")}>6</button>
          <button onClick={() => this.filterCards("7")}>7</button>
          <button onClick={() => this.filterCards("plus")}>7+</button> */}
        </div>
        <div className="Card_list">
          {this.state.setCards
            ? this.state.shownCards.map((singleCard, i) => {
                return <MTGCard key={i} card={singleCard} />;
              })
            : "Loading"}
        </div>
      </div>
    );
  }
}

export default MTGCardList;
