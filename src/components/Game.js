import React, { useState, useEffect } from 'react';
import './Game.css';

//Pull in 'data' prop from the App component
const Game = ({ data, title }) => {
  //initialize state for selected data: selecting word length for later version
  const [gameData, setGameData] = useState(data.threeLetterWords);
  //set the displayed question to a random index in the game data
  const [currentQuestion, setCurrentQuestion] = useState(
    gameData[Math.floor(Math.random() * gameData.length)]
  );
  //initilize state for a controlled input
  const [input, setInput] = useState('');

  // initialize state for score
  const [score, setScore] = useState(0);

  // a side effect of changing the difficulty: change question
  useEffect(() => {
    setCurrentQuestion(gameData[Math.floor(Math.random() * gameData.length)]);
  }, [gameData]);

  //side effect to monitor current word
  useEffect(() => {
    displayWord(currentQuestion.name, input);
  }, [input, currentQuestion]);

  function resetQuestion() {
    let index = gameData.indexOf(currentQuestion);
    gameData.splice(index, 1);
    setCurrentQuestion(gameData[Math.floor(Math.random() * gameData.length)]);
  }
  /**Validates if the input is correct, if so, it will update the score and move on to the next question */
  function onInputSubmit() {
    let message = document.getElementById('message');

    if (currentQuestion.name === input) {
      //increment score
      setScore(score + 1);

      // show a sucess message and reset input
      message.classList.add('correct');
      message.innerText = "Great Job! Let's try another one!";

      //reset the input and question
      setTimeout(() => {
        //call resetQuestion
        resetQuestion();
        setInput('');
        message.innerText = '';
      }, 3000);

      //change the question, remove currentQuestion from data and show next question
    } else if (currentQuestion !== input) {
      //display an error message
      message.classList.add('wrong');
      message.innerText = 'Incorrect spelling. Please try again!';

      setTimeout(() => {
        // after a 3 seconds, reset the input and remove error message
        setInput('');
        message.classList.remove('wrong');
        message.innerText = '';
      }, 3000);
    }
  }
  /**@description This function displays a word and validates the input against the choosen word
   * @param word - this is the randomly chosen word to spell.
   * @param input - the input that the user is typing into the field
   */
  function displayWord(word, input) {
    //get the div for the spans/letters
    let spanDiv = document.getElementById('word');

    //clear the div to avoid duplicate placements on refresh
    spanDiv.innerHTML = '';

    //break the word into an array
    let brokenWord = word.split('');
    // store the input into an array
    let inputArray = input.split('');

    //display each letter as an individual span
    brokenWord.forEach((letter, index) => {
      //create a span element
      let span = document.createElement('SPAN');

      // validate each letter from the input to determine color
      if (inputArray[index] === undefined) {
        //if there are no entries, remove any applied classes
        span.classList.remove(...span.classList);
      } else {
        //apply correct color class to the letter span
        if (inputArray[index] === letter) {
          // if correct, apply green
          span.classList.add('correct');
        } else {
          // if incorrect, apply red
          span.classList.add('wrong');
        }
      }

      //display each letter in the span
      span.innerText = letter;
      //push the letter to the DIV
      spanDiv.appendChild(span);
    });
  }
  //End displayWord function

  return (
    <div className="ui vertically divided grid">
      {/* This is the header */}
      <div
        className="ui header"
        style={{ textAlign: 'center', margin: '3em 0' }}
      >
        <h1>{title}</h1>
        <h3>Score: {score}</h3>
        <div>
          <button
            className="button"
            onClick={() => setGameData(data.threeLetterWords)}
          >
            3-Letter Words
          </button>
          <button
            className="button"
            onClick={() => setGameData(data.fourLetterWords)}
          >
            4-Letter Words
          </button>
        </div>
      </div>

      <div className="two column row">
        <div className="column">
          <img src={currentQuestion.picture} alt={currentQuestion.name} />
        </div>
        <div className="column input-column">
          <div id="word" className="segment word-to-spell"></div>
          <div className="segment">
            <div className="ui massive input">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button className="button" onClick={onInputSubmit}>
                Submit
              </button>
            </div>
            <div id="message"></div>
          </div>
        </div>
        <div className="column">
          <div className="segment description">{currentQuestion.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default Game;
