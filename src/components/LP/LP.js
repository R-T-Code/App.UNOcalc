import React from 'react';
import logo from '../../img/uno2.png';

const LP = (props) => {

    return (
        <div>
            <img src={logo} alt="UNO logo"/>
            <h1>UNO calc</h1>
            <p>Enter name</p>
            <form onSubmit={props.addNewPlayer}>
                <input 
                    type='text'
                    placeholder='enter name' 
                    value={props.playerName} 
                    onChange={props.onNameInputChange}/>
                <button>Add new player</button>
            </form>
        </div>
    ) 
};

export default LP;
