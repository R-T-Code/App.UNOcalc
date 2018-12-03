import React from 'react';
import Player from '../Player/Player';

const Game = (props) => {
    const players = [...props.players]

    return (
        <div className='game'>
            <h1>Game</h1>
            <div className='playersContainer'>
                {players.map((player,i) => {
                    return (
                        <Player 
                            key={i} 
                            index={i} 
                            name={player.playerName} 
                            matchScores={player.playerMatchScores} 
                            gameScore={player.playerGameScore}
                            toggle={props.toggle}
                            onPointsInputChange={props.onPointsInputChange}
                            matchScore={props.matchScore}
                            submitHandler={props.submitHandler}
                            activePlayer={props.activePlayer}/>
                    )
                })}
            </div>
        </div>
    )
};

export default Game;