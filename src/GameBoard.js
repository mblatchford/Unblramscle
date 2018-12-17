import React, { Component } from 'react';
import Square from  './Square';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      tiles: [1,2,3,4,5,6,7,8,9],
      // pairOfClicks: 1
      pairOfClicks: false
    }
  }
  
  // _handleClicks = () => {
  //   // console.log('tile clicked');
  //   console.log('state of pairOfClicks: ' + this.state.pairOfClicks);
  //   // register a click
  //   // const incrementClick = this.state.pairOfClicks + 1;
  //   // console.log('incrementClick: ' + incrementClick);
  //   this.setState({
  //     pairOfClicks: this.state.pairOfClicks + 1
  //   })
  //   console.log('state of pairOfClicks: ' + this.state.pairOfClicks);
  //   // if a pair
  //   if(this.state.pairOfClicks % 2 === 0){
  //     console.log('pair of tiles')
  //   }else if(this.state.pairOfClicks % 2 !== 0){
  //       console.log('one tile clicked')
  //   }
          
  // }
  _handleClicks = () => {
    console.log('tile clicked');
    console.log('state of pairOfClicks: ' + this.state.pairOfClicks);
    const check = this.state.pairOfClicks ? 
    (this.setState({pairOfClicks: false}), console.log('pair of tiles'))  
    : (this.setState({pairOfClicks: true}),console.log('one tile clicked'))
    
    console.log(this.state.tiles);
    // this.state.squares

    //register first click
    // if (this.state.pairOfClicks[0] === false){
    //   this.setState({
    //     pairOfClicks: [true,false]
    //   })
    //   console.log('one tile clicked')
    // }else{
    //   // register second click
    //   this.setState({
    //     pairOfClicks: [false,false]
    //   })
    //   console.log('pair of tiles')

    // }
          
   }

  render() {
    console.log(this.state.pairOfClicks);
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