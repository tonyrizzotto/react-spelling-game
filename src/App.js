import React from 'react';
//import Header from './components/Header';
import Game from './components/Game';
import data from './data';

const App = (props) => {
  return (
    <div className="ui container">
      {/* <Header title="SPELL THIS WORD" /> */}
      <Game data={data} title="Let's Spell" />
    </div>
  );
};

export default App;
