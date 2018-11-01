import React, { Component, ReactText } from 'react';
import { Card, Cards } from 'scryfall-sdk';

class MTGCard extends Component<any, { card: Card }> {
  interval: any;
  constructor(props) {
    super(props);
    this.state = {
      card: localStorage.getItem(this.props.number)
        ? JSON.parse(localStorage.getItem(this.props.number))
        : null
    };
  }

  componentDidMount() {
    if (!localStorage.getItem(this.props.number)) {
      setTimeout(() => {
        Cards.bySet("grn", this.props.number).then(card => {
          this.setState({
            card: card
          });
          localStorage.setItem(this.props.number, JSON.stringify(card));
        });
      }, this.props.number * 400);
    }
  }

  componentWillUnmount() {
    // this.stop();
  }

  render() {
    return (
      <div className="card">
        {this.state.card ? (
          <img src={this.state.card.image_uris.normal} />
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}

export default MTGCard;
