import React, { Component } from 'react';
import Square from  './Square';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state=({
      tiles: [1,2,3,4,5,6,7,8,9],
      pairOfClicks: false
    })
  }
  
  render() {
    return (
      <div>
        <Square  
          squares={this.state.tiles}
        />
      </div>
    );
  }
}

export default GameBoard;