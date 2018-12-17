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
    this.setState({
       clicked: [...this.state.clicked, tileID]
    }, () => {
      const isPairClicked = this.state.clicked.length === 2;
      if(isPairClicked){
        this._swapTiles();
      }
    })
  }


   _swapTiles = () => {
    //  second click occured reset clicked array
    this.setState({ 
      clicked: []
    }) 
      if(this.state.clicked[0] !== this.state.clicked[1]){
        // ID values of each clicked tile
        const clickedID1 =  this.state.clicked[0];
        const clickedID2 =  this.state.clicked[1];
        // array of tiles by id
        const mapIndex = this.state.tiles.map(index => {
          return index.id 
        });
        // indicies in tiles[] of the clicked tile uuid
        const tileIndex1 = mapIndex.indexOf(clickedID1);
        const tileIndex2 = mapIndex.indexOf(clickedID2);

        // perform swap
        // copy array
        const newArray = [...this.state.tiles];
        // copy value to be overwritten
        const temp = newArray[tileIndex1];
        // reassign values
        newArray[tileIndex1] = newArray[tileIndex2];
        newArray[tileIndex2] = temp;

        this.setState({
          tiles: newArray
        })

      } //else do nothing if same button is clicked (effective reset)
  }

  _randomizeTiles = () => {
    const shuffledTiles = [...this.state.tiles];

    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }
    this.setState({
      tiles: shuffledTiles 
    })

  }

  render() { 

    return (
      <div>
        <Square  
          handleClick = {this._handleClicks}
          squares={this.state.tiles}
        />
       <button className='shuffle' onClick={() => this._randomizeTiles()}>Shuffle Tiles</button> 
      </div>
    );
  }
}

export default GameBoard;