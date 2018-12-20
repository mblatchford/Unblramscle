import React from 'react';


const InitGame = (props) => {
  const grid = props.grid;  
  
  // Main logic gatekeeper:
  // If you pressed the start button it replaces all current buttons with a reset and has your image shuffled
  // Otherwise it defaults to NewImage/Tile++/Tile--/Start
  const initReturn = () => {
    return props.startBool ? startButton() : buttonReturn() 
  }

  const startButton = () => {
    return (
      <div>
        <button className="reset" onClick={() => props.reset()}>Reset</button>
      </div>
    )
  }

  // Button logic is it's own gatekeeper adding/removing inc and dec buttons as necessary
  const buttonReturn = () => { 
    if(grid === 2 ){
      return(
        <div>
          <button className="newImg" onClick={() => props.newImage()}>New Image</button>
          <button className="gridInc" onClick={() => props.size("inc")}>Tiles++</button>
          <button className="start" onClick={() => props.startButton()}>Start</button>
        </div>
      )
    }else if(grid >= 3 && grid <= 5){
      return(
        <div>
          <button className="newImg" onClick={() => props.newImage()}>New Image</button>
          <button className="gridInc" onClick={() => props.size("inc")}>Tiles++</button>
          <button className="gridDec" onClick={() => props.size("dec")}>Tiles--</button>
          <button className="start" onClick={() => props.startButton()}>Start</button>
        </div>
      )
    }else if(grid === 6){
      return(
        <div>
          <button className="newImg" onClick={() => props.newImage()}>New Image</button>
          <button className="gridDec" onClick={() => props.size("dec")}>Tiles--</button>
          <button className="start" onClick={() => props.startButton()}>Start</button>
        </div>
      )
    }
  }
  
  return (
    <div>
      {initReturn()}
     </div>
  );
};

export default InitGame;