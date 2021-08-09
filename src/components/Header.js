import React from 'react';

const Header = (props) => {
  return (
    <div
      className="ui header"
      style={{ textAlign: 'center', margin: '3em 0' }}
    >
      <div>{props.title}</div>
    </div>
  );
};

export default Header;
