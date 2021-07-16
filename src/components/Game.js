import React, { useState, useEffect } from 'react';

const GameDisplay = ({ data }) => {
  //initialize state for selected data
  const [gameData, setGameData] = useState(data.threeLetterWords);
  //initialize state for difficulty
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  //initilize state for a controlled input
  const [input, setInput] = useState('');

  //Helper function to change difficulty
  const setDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
    if (selectedDifficulty === '3') {
      setGameData(data.threeLetterWords);
    } else {
      setGameData(data.fourLetterWords);
    }
  };

  return (
    <div className="ui vertically divided grid">
      <div style={{ textAlign: 'center' }}>
        <span>
          Set Difficulty:
          <button
            className="ui button"
            id="three"
            value="3"
            onClick={setDifficulty}
          >
            3-Letter Words
          </button>
          <button
            className="ui button"
            id="four"
            value="4"
            onClick={setDifficulty}
          >
            4-Letter Words
          </button>
        </span>
        <div>{selectedDifficulty}</div>
      </div>
      <div className="two column row">
        <div className="column">
          <img />
        </div>
        <div className="column">
          <div className="segment">{gameData[0].name}</div>
          <div className="segment">
            <div className="ui massive input">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDisplay;
