import React from 'react';

const LP = (props) => {

    return (
        <div>
           <div className='logoWrapper'>
                <h1 className='logoUno'>UNO</h1>
                <h2 className='logoWord'>calc</h2>
           </div>
            <div className='formWrapper'>
                <p className='formText'>Enter name</p>
                <form className='lpForm' onSubmit={props.addNewPlayer}>
                    <input
                        className='formInput' 
                        type='text'
                        placeholder='enter name' 
                        value={props.playerName} 
                        onChange={props.onNameInputChange}/>
                    <button className='formBtn'>Add new player</button>
                </form>
            </div>
        </div>
    ) 
};

export default LP;
