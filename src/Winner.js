import React from 'react';

// Winner text is set to a const that only is sent to JSX if the winner state is true
const Winner = (props) => {
    const displayWinner = 
    <div>
        <div className="winner">y<div className="juxtapose">o</div>u</div>
        <div className="winner"><div className="juxtapose">w</div>i<div className="juxtapose">n</div>!</div> 
    </div>;
   
    const hidden =
        props.ifWinner ? displayWinner : null;
    
    return (
        <div>
            {hidden}
        </div>
    );
};

export default Winner;