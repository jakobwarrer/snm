import './App.css';

import React, { Component } from 'react';
import { Card } from 'scryfall-sdk';

import MTGCardList from './components/CardList';
import CountDownTimer from './components/CountDownTimer';

// import Promise from 'promise-polyfill';
class App extends Component<any, { count: number }> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {}

  render() {
    let countDownDate: string = "Nov 17, 2018 15:00:00";

    return (
      <div className="App">
        <header className="App-header">
          <p>Time to Saturday Night Magic</p>
          <CountDownTimer targetDate={countDownDate} />
          <MTGCardList />
        </header>
      </div>
    );
  }
}

export default App;
