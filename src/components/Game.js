import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = ({ data }) => {
  //initialize state for selected data: selecting word length for later version
  const [gameData, setGameData] = useState(data.threeLetterWords);

  //set the displayed question to a random index in the game data
  const [currentQuestion, setCurrentQuestion] = useState(
    gameData[Math.floor(Math.random() * gameData.length)]
  );

  //initilize state for a controlled input
  const [input, setInput] = useState('');

  //side effect to monitor current word
  useEffect(() => {
    displayWord(currentQuestion.name, input);
  }, [input, currentQuestion]);

  //write a function to place the word into the div
  function displayWord(word, input) {
    //get the div for the spans/letters
    let spanDiv = document.getElementById('word');

    //clear the div to avoid duplicate placements on refresh
    spanDiv.innerHTML = '';

    //break the word into an array
    let brokenWord = word.split('');
    // store the input into an array
    let inputArray = input.split('');

    // make sure input doesn't go longer than the word

    //display each word as an individual span
    brokenWord.forEach((letter) => {
      //create a span element
      let span = document.createElement('SPAN');

      // validate each letter from the input to determine color
      inputArray.forEach((i) => {
        //apply correct color class to the letter span
        if (
          i === letter &&
          inputArray.indexOf(i) === brokenWord.indexOf(letter)
        ) {
          // if correct, apply green
          span.classList.add('correct');
        } else if (
          i !== letter &&
          inputArray.indexOf(i) === brokenWord.indexOf(letter)
        ) {
          // if incorrect, apply red
          span.classList.add('wrong');
        }
      });

      //display each letter in the span
      span.innerText = letter;
      //push the letter to the DIV
      spanDiv.appendChild(span);
    });
  }

  return (
    <div className="ui vertically divided grid">
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
              <button className="button">Submit</button>
            </div>
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
