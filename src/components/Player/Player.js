import React from 'react';
import { FaTimes } from 'react-icons/fa';



const Player = (props) => {
        const ul = <ul className="pointsList">
                    {props.matchScores.map((score,i) => {
                        return(
                        <li className='playerLi' key={i}
                        >{score}
                        <span 
                            onClick={() => props.deleteScore(i, props.index)}
                            className='deleteScore' >X</span>
                        </li>
                        )
                    })}
                </ul>
    return (
       <div className='player'>
            <div className='playerNameWrapper'>
                <h2 className='playerName'>{props.name}</h2>
                <FaTimes  className='playerDelete' onClick={() => props.deletePlayer(props.index)}/>
            </div>
           {ul}
           <form className='playerForm' onSubmit={(e) => props.submitHandler(e, props.index)}>
                <input 
                    className='playerInput'
                    value={props.matchScore[props.index].matchScore}
                    type='number' 
                    onChange={props.onPointsInputChange} 
                    name={props.index} 
                    placeholder='enter you points' 
                    onClick={props.toggle}/>
                <button className='playerBtn'>Add points</button>
           </form>
           <p className='playerTotal'>Your Total Score : <span>{props.gameScore}</span></p>
       </div>
    )
};

export default Player;