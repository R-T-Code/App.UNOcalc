import React, { Component } from 'react';
import LP from './components/LP/LP';
import Game from './components/Game/Game';

class App extends Component {
  state = {
    players: [],
    playerName: '',
    matchScore: [],
    activePlayer: '',
    resetPoints: [111, 222, 333, 444, 555, 666, 777, 888, 999]
  }

  componentWillMount (){
    let players = JSON.parse(localStorage.getItem('players'));
    let matchScore = JSON.parse(localStorage.getItem('matchScore'));
    if(players){
      this.setState({players})
    }
    if(players){
      this.setState({matchScore})
    }
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


    // ADD TO LOCAL STORAGE
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('matchScore', JSON.stringify(matchScore));

  }

  // TOGGLE ACTIVE PLAYER IN THE STATE
  toggleActivePlayer = (e) => {
    this.setState({activePlayer: e.target.name})
  }

  // POINTS INPUT
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
    
    // return (dont add points to the list) if nothing is entered into the input field or if the entered value is negative
    if(!matchScore[i].matchScore || matchScore[i].matchScore < 0) return;

    players[i].playerMatchScores.push(parseFloat(matchScore[i].matchScore));

    // Calc total score
    players[i].playerGameScore = players[i].playerMatchScores.reduce((total, item) => {
      return total += item;
    });

    // CHECK IF THE TOTAL GAME SCORE IS EQUAL TO RESET
    const resetPoints = [...this.state.resetPoints];
    const playerGameScore = players[i].playerGameScore;
    const resetMatch = resetPoints.includes(playerGameScore);
    if(resetMatch){
      // display players total score only if its equal
      console.log(playerGameScore);
      // reset the lucky player game score to 0
      players[i].playerGameScore = 0;
      players[i].playerMatchScores = [];
    }

    this.setState({players});
    // Update LS with players arr
    localStorage.setItem('players', JSON.stringify(players));
    matchScore[i].matchScore = '';
    this.setState({matchScore});    
  }

  // DELETE PLAYER
  deletePlayer = (i) => {
    const players = [...this.state.players];
    players.splice(i, 1);
    this.setState({players});

    // Match score array
    const matchScore = [...this.state.matchScore];
    matchScore.splice(i, 1);
    this.setState({matchScore});
    // Update LS with players arr
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('matchScore', JSON.stringify(matchScore));
  }

  // DELETE SINGLE SCORE
  deleteScore = (i, playerIndex) => {
    const players = [...this.state.players].map((player, pI) => {
      if(pI === playerIndex) {
        const playerMatchScores = {...player}.playerMatchScores.filter((score, scoreIndex) => {
            return scoreIndex !== i
          });
          const playerGameScore = playerMatchScores.reduce((total, item) => {
            return total += item;
          });

        return {...player, playerMatchScores, playerGameScore};
      } else {
        return player
      }
    });
    this.setState({players});
    localStorage.setItem('players', JSON.stringify(players));
  }

  render() {
    return (
        <div className='App'>
            <LP 
              playerName={this.state.playerName}
              onNameInputChange={this.onNameInputChange}
              addNewPlayer={this.addNewPlayer}/>
            <Game
              deleteScore={this.deleteScore}
              deletePlayer={this.deletePlayer}
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
