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

const StatisticLine = ({ text, num }) =>
  <tr>
    <td>{text}</td>
    <td>{num}</td>
  </tr>

const Statistics = (props) => {
  const {nGood, nNeutral, nBad, g, n, b} = props;
  if (g !== 0 || n !== 0 || b !== 0) {
    const sum = (g,n,b) => g+n+b;
    const avg = (g,n,b) => (g-b) / (g+n+b);
    const posRatio = (g,n,b) => 100 * g / (g+n+b);
    return (
    <table>
      <tbody>
        <StatisticLine text={nGood} num={g} />
        <StatisticLine text={nNeutral} num={n} />
        <StatisticLine text={nBad} num={b} />
        <StatisticLine text='all' num={sum(g,n,b)} />
        <StatisticLine text='average' num={avg(g,n,b)} />
        <StatisticLine text='positive' num={posRatio(g,n,b) + ' %'} />
      </tbody>
    </table>
    );
  }
  return (<>No feedback given</>);
};

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

  return (
    <>
      <Header text='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header text='statistics' />
      <Statistics
        nGood='good'
        nNeutral='neutral'
        nBad='bad'
        g={good} n={neutral} b={bad}
      />
    </>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);