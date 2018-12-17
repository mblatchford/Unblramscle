import React from 'react';

// const style

const Square = (props) => {
 console.log(props);

  return (
    <div className='tile_container'>
        {props.squares.map(tile => {
          return <div className='tile'> {tile} </div>
         })
        }
    </div>
  );
};

export default Square;