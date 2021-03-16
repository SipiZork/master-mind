import React from 'react';
import styled from 'styled-components';
import Line from './Line';
import TopLine from './TopLine';

const Table = ({ colors, tips, colorsVisible, voteTip, newGame, setNewGame, simple }) => {
  return (
    <Board>
      <TopLine colors={colors} colorsVisible={colorsVisible} />
      {tips.map(tip =>
        <Line tip={tip} key={tip.id} voteTip={voteTip} colorsVisible={colorsVisible} newGame={newGame} setNewGame={setNewGame} simple={simple} />  
      )}
    </Board>
  )
}

const Board = styled.div`
  width: 30%;
  background: rgb(153, 153, 153);
  max-width: 300px;
  min-width: 250px;
  min-height: 500px;
  height: 45rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    margin-top: 2rem;
    max-width: none;
    width: 70%;
    height: 85%;
  }
  @media screen and (max-width: 350px) {
    width: 100%;
  }

`;

export default Table;