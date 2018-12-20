import React from 'react';
import uuid from 'uuid';

const Square = (props) => {
  // Dynamically adding the appropriate CSS class per grid size chosen
  let tileClass = '2x tile_container_x2';
  switch(props.gridSize){
    case 3:
      tileClass = 'x3 tile_container_x3'
      break;
    case 4:
      tileClass = 'x4 tile_container_x4'
      break;
    case 5:
      tileClass = 'x5 tile_container_x5'
      break;
    case 6:
      tileClass = 'x6 tile_container_x6';
      break;
    default:
      tileClass = 'x2 tile_container_x2'
      break;
  }

  // Map through array of tiles making sure it pulls only data actually in a finished setState
  // Injects tile specific background image position data into CSS
  // Adds click handler to each tile
  // Highlights the first clicked tile in a swap

  return (
    <div className={tileClass}>

        {props.squares.map((tile) => {
          const checkBackPosX = tile.backgroundPos && tile.backgroundPos.xPos ? tile.backgroundPos.xPos : 0;
          const checkBackPosY = tile.backgroundPos && tile.backgroundPos.yPos ? tile.backgroundPos.yPos : 0;
          const clicked = props.clicked[0];
          const isClicked = clicked === tile.id ? `6px solid red` : 'none'
          return <div 
            key = {uuid()}
            id = {`tilePos${tile.value-1}`}
            style = {{
              backgroundPositionX: checkBackPosX + `px`,
              backgroundPositionY: checkBackPosY + `px`,
              outline: isClicked,
            }}  
            className={`tile ${tileClass} `}
            onClick={() => props.handleClick(tile.id)}
          > 
          </div>
         })
        }
    </div>
  );
};

export default Square;