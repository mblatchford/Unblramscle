import React from 'react';
import uuid from 'uuid';
// const style

const Square = (props) => {
 console.log(props);

  return (
    <div className='tile_container'>
        {props.squares.map((tile) => {
          return <div 
              key = {uuid()}
              className='tile' 
              onClick={() => props.handleClick(tile.id)}
              > {tile.value} </div>
         })
        }
    </div>
  );
};

export default Square;