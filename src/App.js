import React, {Component} from 'react';
import './App.css';
import wordFile from './words.txt';

import Board from './Components/Board/Board';
import Guess from './Components/Guess/Guess';
import AllWords from './Components/AllWords/AllWords';
import trie from './Components/Util/Trie';
import solver from './Components/Util/Solver';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diceResults: [
                Array(4).fill(""),
                Array(4).fill(""),
                Array(4).fill(""),
                Array(4).fill(""),
            ],
            selected: [
                Array(4).fill(false),
                Array(4).fill(false),
                Array(4).fill(false),
                Array(4).fill(false),
            ],
            paths: [],
            word: '',
            wordStart: false,
            guessedWords: new Set(),
            allWords: [],
            lastTile: [],
            usedTiles: new Set(),
            score: 0,
            showWords: false,
            gameStart: false
        };
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.showPath = this.showPath.bind(this);
    }

  componentDidMount() {
      fetch(wordFile)
          .then(response => {
              return response.text()
          })
          .then(text => {
              text.split('\n').forEach(word => {
                  trie.addWord(word);
              });
          })
          .then(response => {
              alert("tree done");
          });
  }

  dice = [
      ['A', 'E', 'A', 'N', 'E', 'G'],
      ['A', 'H', 'S', 'P', 'C', 'O'],
      ['A', 'S', 'P', 'F', 'F', 'K'],
      ['O', 'B', 'J', 'O', 'A', 'B'],
      ['I', 'O', 'T', 'M', 'U', 'C'],
      ['R', 'Y', 'V', 'D', 'E', 'L'],
      ['L', 'R', 'E', 'I', 'X', 'D'],
      ['E', 'I', 'U', 'N', 'E', 'S'],
      ['W', 'N', 'G', 'E', 'E', 'H'],
      ['L', 'N', 'H', 'N', 'R', 'Z'],
      ['T', 'S', 'T', 'I', 'Y', 'D'],
      ['O', 'W', 'T', 'O', 'A', 'T'],
      ['E', 'R', 'T', 'T', 'Y', 'L'],
      ['T', 'O', 'E', 'S', 'S', 'I'],
      ['T', 'E', 'R', 'W', 'H', 'V'],
      ['N', 'U', 'I', 'H', 'M', 'QU']
  ];

  rollDice = () => {
    const diceRolls = this.state.diceResults.slice();
    let diceLeft = this.dice.slice();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let die = Math.floor(Math.random() * diceLeft.length);
            const ind = Math.floor(Math.random() * 6);
            diceRolls[i][j] = diceLeft[die][ind];
            diceLeft.splice(die, 1);
        }
    }
    this.setState({diceResults: diceRolls});
  }

  isAdjacent(x, y) {
      const adjacent = solver.getAdjacentTiles(this.state.lastTile);
      return adjacent.some(loc => loc[0] === x && loc[1] === y);
  }

  scoreWord = (word) => {
      switch (word.length) {
          case 3:
          case 4:
              return 1;
          case 5:
              return 2;
          case 6:
              return 3;
          case 7:
              return 5;
          default:
              return 11;
      }
  }

  startGame = () => {
      this.setState(() => {
          return {gameStart: false};
      });
  }

  clearSelected = () => {
      const selected = [
          Array(4).fill(false),
          Array(4).fill(false),
          Array(4).fill(false),
          Array(4).fill(false),
      ];
      this.setState(() => {
          return {selected: selected};
      });
  }

  handleStart = async () => {
      await this.clearSelected();
      solver.clear();
      await this.rollDice();
      await solver.solveBoard(this.state.diceResults);
      const words = solver.getWords();
      const paths = solver.getPaths();
      this.setState({allWords: words, guessedWords: new Set(), paths: paths, score: 0, showWords: false, gameStart: true});
  }

  handlePointerDown = (x, y, isMouseDown) => {
      if(!this.state.selected[x][y]) {
          this.setState((prevState) => {
              const selected = prevState.selected;
              selected[x][y] = true;
              return {wordStart: isMouseDown, lastTile: [x, y], selected: selected, word: prevState.diceResults[x][y]}
          });
      }
  }


  handlePointerUp() {
      if(this.state.wordStart){
          const selected = [
              Array(4).fill(false),
              Array(4).fill(false),
              Array(4).fill(false),
              Array(4).fill(false),
          ];
          const usedTiles = new Set();
          if (this.state.word.length >= 3 && !this.state.guessedWords.has(this.state.word)){
              if (trie.checkWord(this.state.word)) {
                  const points = this.scoreWord(this.state.word);
                  const guesses = new Set(this.state.guessedWords);
                  guesses.add(this.state.word);
                  this.setState((prevState) => {
                      const newScore = prevState.score + points;
                      return {word: '', lastTile: [], guessedWords: guesses, selected: selected, wordStart: false, usedTiles: usedTiles, score: newScore};
                  });
              } else {
                  this.setState({word: '', lastTile: [], selected: selected, wordStart: false, usedTiles: usedTiles});
              }
          } else {
              this.setState({word: '', lastTile: [], selected: selected, wordStart: false, usedTiles: usedTiles});
          }
      }
  }

  handlePointerEnter = (x, y, letter) => {
      if (this.state.wordStart){
          if(this.isAdjacent(x, y)){
              if (!this.state.selected[x][y] && !this.state.usedTiles.has(`${x.toString()}${y.toString()}`)) {
                  this.setState((prevState) => {
                      const selected = prevState.selected;
                      const usedTiles = new Set(prevState.usedTiles);
                      usedTiles.add(`${x.toString}${y.toString()}`);
                      selected[x][y] = true;
                      return {
                          word: prevState.word + letter,
                          usedTiles: usedTiles,
                          lastTile: [x, y],
                          selected: selected
                      };
                  });
              }
          }
      }
  }

  showPath = async (index) => {
      await this.clearSelected();
      const newSelected = this.state.selected.slice();
      const paths = this.state.paths[index];
      console.log(index);
      console.log(paths);
      paths.forEach((tile, index) => {
          setTimeout(() => {
              newSelected[tile[0]][tile[1]] = true;
              this.setState({selected: newSelected})
          }, (index + 1) * 300);
      });

  }

  handleSolve = () => {
      this.setState({showWords: true});
  }

  render () {
    return (
        <div className={"app"}
             onMouseUp={this.handlePointerUp}>
            <div className={"game-area"}>
                <Guess string={this.state.word}/>
                <Board
                    dice={this.state.diceResults}
                    selected={this.state.selected}
                    handlePointerDown={this.handlePointerDown}
                    handlePointerEnter={this.handlePointerEnter}
                    isMouseDown={this.state.wordStart}
                />
                <div className={"button-div"}>
                    <button
                        className={"game-button"}
                        onClick={() => this.handleStart()}>START</button>
                    <button
                        className={"game-button"}
                        onClick={() => this.handleSolve()}>SOLVE</button>
                </div>
                <div className={"stats-panel"}>
                    <h2>Score: <span className={"user-score"}>{this.state.score}</span></h2>
                    {/*<Timer*/}
                    {/*    gameStart={this.state.gameStart}*/}
                    {/*    startGame={this.startGame}*/}
                    {/*/>*/}
                </div>
                <hr/>
            </div>

            <div className={"word-area"}>
                <AllWords words={this.state.allWords}
                          found={this.state.guessedWords}
                          show={this.state.showWords}
                          handleClick={this.showPath}
                />
            </div>
        </div>
    );

  }
  
}

export default App;
