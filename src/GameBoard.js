import React, { Component } from 'react';
import Square from  './Square';
import InitGame from './InitGame';
import uuid from 'uuid';


class GameBoard extends Component {
  constructor(props) {
    super(props);


    this.state={
      shuffled: [1], 
      ordered: [],           
      clicked: [],
      grid: 2,
      start: false,
    } 
  }

  // makes copy of array before any shuffling one time after initial render
  componentDidMount(){
    this._howManytoRender()
  }

           
  _handleTileClicks = (tileID) => {
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
        const mapIndex = this.state.shuffled.map(index => {
          return index.id 
        });
        // indicies in tiles[] of the clicked tile uuid
        const tileIndex1 = mapIndex.indexOf(clickedID1);
        const tileIndex2 = mapIndex.indexOf(clickedID2);

        // perform swap
        // copy array
        const newArray = [...this.state.shuffled];
        // copy value to be overwritten
        const temp = newArray[tileIndex1];
        // reassign values
        newArray[tileIndex1] = newArray[tileIndex2];
        newArray[tileIndex2] = temp;

        this.setState({
          shuffled: newArray
        }, () =>  this._ifHasWon() )

     
        
      } //else do nothing if same button is clicked (effective reset)
  }


  _ifHasWon = () => {
    // map each to compare arrays of id's
    const masterIndex = this.state.ordered.map(object => {
      return object.id; 
    });
    const comparison = this.state.shuffled.map(object => {
      return object.id; 
    });

    if (JSON.stringify(comparison) === JSON.stringify(masterIndex)) {
      console.log('Winner');
    }
   
  }


  _randomizeTiles = () => {
    const shuffledTiles = [...this.state.shuffled];

    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }
    this.setState({
      shuffled: shuffledTiles 
    })

  }

  _gridSize = (gridDirection) => {
    const curGridSize= this.state.grid;
    if(gridDirection === 'inc'){
      this.setState({
        grid: curGridSize + 1 
      }, () => {
        console.log(`inc ${this.state.grid}`);
        this._howManytoRender()
      })

    }else if(gridDirection === 'dec'){
      this.setState({
        grid: curGridSize - 1 
      }, () => 
        {console.log(`dec ${this.state.grid}`); 
        this._howManytoRender()
      })
    }

  }
  

  _howManytoRender = () => {
    const grid = this.state.grid;
    const gridSize = grid * grid;
    const newArray = [];
    for(let i = 0; i < gridSize; i++){
      newArray.push({'value':i+1, 'id': uuid()});
    }
    this.setState({
      shuffled: newArray 
    })
  }
  
  _gameStart = () => {
    this.setState({
      start: true, 
      ordered: this.state.shuffled,
    }, () => this._randomizeTiles())
  }

  _resetGame = () => {
    this.setState({
      shuffled: [1], 
      ordered: [],           
      clicked: [],
      grid: 2,
      start: false,
    }, () => this._howManytoRender())
  }


  render() { 

    return (
      <div className="board">
        <InitGame 
          // passing method, chain will render num tiles required
          size = {this._gridSize} 
          // passing current grid: value
          gridSize = {this.state.grid}
          startButton = {this._gameStart}
          startBool = {this.state.start}
          reset = {this._resetGame}
        />
        <Square  
          gridSize = {this.state.grid}
          handleClick = {this._handleTileClicks}
          squares={this.state.shuffled}
        />
      
      </div>
    );
  }
}

export default GameBoard;