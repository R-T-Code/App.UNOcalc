import React, { Component } from 'react';
import LP from './components/LP/LP';
import Game from './components/Game/Game';

class App extends Component {
  state = {
    players: [],
    playerName: '',
    matchScore: [],
    activePlayer: ''
  }

  // NAME INPUT
  onNameInputChange = (e) => {
    this.setState({playerName: e.target.value})
  }

  // ADD NEW PLAYER
  addNewPlayer = (e) => {
    e.preventDefault();
    const newPlayer = this.state.playerName;
    if(!newPlayer) return
    const players = [...this.state.players];
    players.push({playerName: newPlayer, playerMatchScores: [], playerGameScore: 0});
    this.setState({players, playerName: ''});
   
    // Create match score array of objects TEST TEST TEST
    const matchScore = [...this.state.matchScore];
    matchScore.push({playerName: newPlayer, matchScore: ''});
    this.setState({matchScore});
  }

  // TOGGLE ACTIVE PLAYER IN THE STATE
  toggleActivePlayer = (e) => {
    this.setState({activePlayer: e.target.name})
  }

  // POINTS INPUT !!!!!  VEIKIA!!!!!
  onPointsInputChange = (e) => {
    const matchScore = [...this.state.matchScore];
    matchScore[e.target.name].matchScore = e.target.value;
    this.setState({matchScore});
  }

  // ADD POINTSG ON SUBMIT
  submitHandler = (e, i) => {
    e.preventDefault()
    const players = [...this.state.players];
    const matchScore = [...this.state.matchScore];
    
    if(!matchScore[i].matchScore) return;

    players[i].playerMatchScores.push(parseFloat(matchScore[i].matchScore));

    // Calc total score
    players[i].playerGameScore = players[i].playerMatchScores.reduce((total, item) => {
      return total += item;
    });

    this.setState({players});
    matchScore[i].matchScore = '';
    this.setState({matchScore});    
  }

  render() {
    return (
        <div className='App'>
            <LP 
              playerName={this.state.playerName}
              onNameInputChange={this.onNameInputChange}
              addNewPlayer={this.addNewPlayer}/>
            <Game
              submitHandler={this.submitHandler}
              matchScore={this.state.matchScore}
              onPointsInputChange={this.onPointsInputChange}
              toggle={this.toggleActivePlayer}
              players={this.state.players}
              activePlayer={this.state.activePlayer}/>
        </div>
    );
  }
}

export default App;
