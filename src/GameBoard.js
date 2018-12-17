import React, { Component } from 'react';
import Square from  './Square';
import uuid from 'uuid';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      tiles: [{'value':1,id:uuid()},
              {'value':2,id:uuid()},
              {'value':3,id:uuid()},
              {'value':4,id:uuid()},
              {'value':5,id:uuid()},
              {'value':6,id:uuid()},
              {'value':7,id:uuid()},
              {'value':8,id:uuid()},
              {'value':9,id:uuid()},
            ],
      clicked: [],
    }
  }
          
  _handleClicks = (tileID) => {
    console.log('1')
    console.log(`tile ${tileID} clicked`);
    this.setState({
      //  clicked: this.state.clicked.concat(tileID)
       clicked: [...this.state.clicked, tileID]
    }, () => {
      const isPairClicked = this.state.clicked.length === 2;
      console.log(isPairClicked);
      if(isPairClicked){
        this._swapTiles();
      }
    })}


   _swapTiles = () => {
    //  if second click is on the same tile reset clicked array
    this.setState({ 
      clicked: []
    })
    if(this.state.clicked[0]=== this.state.clicked[1]){
      console.log('they match');
    }
     
  }

  render() {
    // console.log(this.state.pairOfClicks);
    console.log(this.state.clicked); 
    

    return (
      <div>
        <Square  
          handleClick = {this._handleClicks}
          squares={this.state.tiles}
        />
      </div>
    );
  }
}

export default GameBoard;