import React from 'react';



const Player = (props) => {
        const ul = <ul className="pointsList">
                    {props.matchScores.map((score,i) => {
                        return(
                        <li key={i}>{score}</li>
                        )
                    })}
                </ul>
    return (
       <div>
           <h2 className='playerName'>{props.name}</h2>
           {ul}
           <form onSubmit={(e) => props.submitHandler(e, props.index)}>
                <input 
                    value={props.matchScore[props.index].matchScore}
                    type='number' 
                    onChange={props.onPointsInputChange} 
                    name={props.index} 
                    placeholder='enter you points' 
                    onClick={props.toggle}/>
                <button>Add points</button>
           </form>
           <p >Your Total Score : {props.gameScore}</p>
       </div>
    )
};

export default Player;