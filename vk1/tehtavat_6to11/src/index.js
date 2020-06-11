import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const Header = ({ text }) =>
  <h1>
    {text}
  </h1>

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1)
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  };

  const handleBad = () => {
    setBad(bad + 1)
  };

  const sum = (a,b,c) => a+b+c;

  const avg = (a,b,c) => (a-c) / (a+b+c);

  const posRatio = (g,n,b) => 100 * g / (g+n+b)

  return (
    <>
      <Header text='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header text='statistics' />
      good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad} <br></br>
      all {sum(good, neutral, bad)} <br></br>
      average {avg(good, neutral, bad)} <br></br>
      positive {posRatio(good, neutral, bad)} %
    </>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);