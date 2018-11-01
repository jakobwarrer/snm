import './App.css';

import React, { Component } from 'react';
import { Card, Sets } from 'scryfall-sdk';

import MTGCard from './components/Card';
import CountDownTimer from './components/CountDownTimer';

// import Promise from 'promise-polyfill';
class App extends Component<any, { count: number; setCards: Card[] }> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0, setCards: null };
  }
  componentDidMount() {
    this.getCards();
  }
  getCards() {
    let step: number;
    Sets.byCode("grn")
      .then(set => set.card_count)
      .then((setCount: number) => {
        this.setState({
          count: setCount
        });
      });
  }

  // getAllCards() {
  //   Sets.byCode("grn")
  //     .then(set => set.card_count)
  //     .then((count: number) => {
  //       let step: number;
  //       let cards: Card[] = [];
  //       let promises = [];
  //       for (step = 1; step < 2; step++) {
  //         setTimeout(() => {
  //           let promise = Cards.bySet("grn", step);
  //           promises.push(promise);
  //         }, step + 200);
  //       }
  //       return promises;
  //     })
  //     .then(prom => {
  //       Promise.all(prom).then(card => {
  //         console.log(card);
  //         this.setState({
  //           setCards: card
  //         });
  //       });
  //     });
  // }
  render() {
    let countDownDate: string = "Nov 20, 2018 15:00:00";
    var cards = [];
    for (let step = 1; step < this.state.count + 1; step++) {
      cards.push(<MTGCard key={step} number={step} />);
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>Time to Saturday Night Magic</p>
          <CountDownTimer targetDate={countDownDate} />
          <div className="Card_list">{cards}</div>
        </header>
      </div>
    );
  }
}

export default App;
