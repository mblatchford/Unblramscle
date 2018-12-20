import React, { Component } from 'react';
import uuid from 'uuid';

import Square from  './Square';
import InitGame from './InitGame';
import Picture from './Picture';
import Winner from './Winner';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state={
			shuffled: [], //Main array of tiles that get shuffled
			ordered: [],  //Secondary array holds the inital position of tiles before any shuffling         
			clicked: [],	//Array keeps record of what tiles were clicked in order to swap when necessary
			grid: 2, 			//Default grid length is 2x2
			start: false,	//Start button pressed logic
			winner: false,//Game was won
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
			this.setState({
				winner: true
			})
			// hacky reset button
			setTimeout(function(){ 	window.location.reload(); }, 3000);
		 
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
	// Method handles passing off the addition and subtraction of tiles
	_gridSize = (gridDirection) => {
		const curGridSize= this.state.grid;
		if(gridDirection === 'inc'){
			this.setState({
				grid: curGridSize + 1 
			}, () => {
				this._howManytoRender()
			})

		}else if(gridDirection === 'dec'){
			this.setState({
				grid: curGridSize - 1 
			}, () => 
				{
				this._howManytoRender()
			})
		}

	}
	
		// Method takes the grid value, calculates total tiles required, 
		// gives each one a hidden value, a unique id and 
		//an object that stores background image position data
	_howManytoRender = () => {
		const grid = this.state.grid;
		const gridSize = grid * grid;
		const newArray = [];
		const arrayPos = this._backgroundPos();
		for(let i = 0; i < gridSize; i++){
			newArray.push({'value':i+1, 'id': uuid(), 'backgroundPos': arrayPos[i]
			});
		}
		this.setState({ 
			shuffled: newArray  
		})
	}
	
	// Method calculates each "window" of the background image to show on a given tile
	_backgroundPos = () => {
		// grid tells me how many tiles in a given col||row
		const grid = this.state.grid;
		// actual upperleft img position starting coordinates
		// all images hardcoded to 800x600 resolution
		const xLength = 800/grid;
		const yLength = 600/grid;
		let x = 800;
		let y = 600;
		const backgroundPosArray = [];
		// x & y reversed in nested loops to allow for row precedence instead of filling by column first
		// this because using css grid to display tiles restricts to placement in this order
			for(let i = 0; i >= -(yLength*(grid-1)); i= i-yLength){
					y = i
				for(let j = 0; j >= -(xLength*(grid-1));  j= j-xLength){
				 x = j
					backgroundPosArray.push({xPos: x, yPos: y})   
				}
			}
			console.log("ImagePositions")
			console.table(backgroundPosArray);
			return backgroundPosArray;
	}

	// Helper to toggle start button state and call the tile shuffle method
	// Also where once user has selected the image to play 
	//a copy of the array is made as a comparison key
	_gameStart = () => {
		this.setState({
			start: true, 
			ordered: this.state.shuffled, 
		}, () => this._randomizeTiles())
	}

	//Reset button allows for reselecting number of tile divisions on given image
	// It sets all calculations back to defaults but doesn't refresh image selection
	_resetGame = () => {
		this.setState({
			shuffled: [], 
			ordered: [],           
			clicked: [],
			grid: 2,
			start: false,
			winner: false,
		}, () => this._howManytoRender())
	}

	// hacky fix just reloads the page to refresh image
	_newImageHandler = () => {
		window.location.reload(); 
	}

	render() { 

		return (
			<div className="wrapper">
				<h1>
					scramble<div className="juxtapose">un</div>
					{/* scramble<div className="juxtapose">Un</div>ram<div className="juxtapose">sc</div>e */}
				</h1>
				<div className="interface">
					<InitGame 
						// passing method, chain will render num tiles required
						size = {this._gridSize} 
						// passing current grid: value
						grid = {this.state.grid}
						// button handler funtions
						startButton = {this._gameStart}
						startBool = {this.state.start}
						reset = {this._resetGame}
						newImage = {this._newImageHandler}
					/>
					{/* Picture component is a smaller unshuffled version of the shuffled image as reference */}
					{/* Winner component only visible on a win */}
					<div className="picture">
          	<Picture />
						<Winner ifWinner = {this.state.winner} />
					</div>
				</div>
					{/* Tiles are rendered here from the Square component */}
					<div className="board_container"> 
					<Square  
						gridSize = {this.state.grid}
						handleClick = {this._handleTileClicks}
						squares={this.state.shuffled}
						clicked={this.state.clicked}
					/>
				</div>
				
		</div>

		);
	}
}

export default GameBoard;