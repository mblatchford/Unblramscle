import React from 'react';
import uuid from 'uuid';

const Square = (props) => {
  
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


  return (
    <div className={tileClass}>
        {props.squares.map((tile) => {
          return <div 
              key = {uuid()}
              className={`tile + ${tileClass}`}
              onClick={() => props.handleClick(tile.id)}
              > {tile.value} </div>
         })
        }
    </div>
  );
};

export default Square;