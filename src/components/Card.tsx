import React, { Component, ReactText } from 'react';
import { Card } from 'scryfall-sdk';

class MTGCard extends Component<{ card: Card }> {
  interval: any;
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   if (!localStorage.getItem(this.props.number)) {
  //     setTimeout(() => {
  //       Cards.bySet("grn", this.props.number).then(card => {
  //         this.setState({
  //           card: card
  //         });
  //         localStorage.setItem(this.props.number, JSON.stringify(card));
  //       });
  //     }, this.props.number * 400);
  //   }
  // }

  componentWillUnmount() {
    // this.stop();
  }

  render() {
    return (
      <div className="card">
        {this.props.card ? (
          <img src={this.props.card.image_uris.normal} />
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}

export default MTGCard;
