import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './components/GlobalyStyle';
import Table from './components/Table';
import Menu from './components/Menu';

function App() {

  const [newGame, setNewGame] = useState(false);
  const [colorsVisible, setColorsVisible] = useState(false);
  const [colors, setColors] = useState(null);
  const [active, setActive] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [simple, setSimple] = useState(false);
  const [tips, setTips] = useState([
    {
      id: 1,
      active: true,
      played: false,
      tips: []
    },
    {
      id: 2,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 3,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 4,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 5,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 6,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 7,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 8,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 9,
      active: false,
      played: false,
      tips: []
    },
    {
      id: 10,
      active: false,
      played: false,
      tips: []
    },
  ]);

  const voteTip = (tippedColors) => {
    let correctCounter = 0;
    let newTips = [];
    for (let i = 0; i < tippedColors.length; i++) {
      let color = false;
      let position = false;
      const inColors = colors.includes(tippedColors[i]);
      if (inColors) {
        color = true;
        const indexOfOriginalColors = colors.findIndex(number => number === tippedColors[i]);
        if (indexOfOriginalColors === i) {
          position = true;
          correctCounter++;
        }
      }
      const newTip = {
        number: tippedColors[i],
        active: false,
        color,
        position
      }
      newTips.push(newTip);
    }
    if (correctCounter === 4 || active + 1 > 10) {
      setColorsVisible(true);
    }
    let oldTips = [...tips];
    for (let i = 0; i < oldTips.length; i++) {
      oldTips[i].active = false;
    }
    oldTips[active - 1].tips = newTips;
    if (active + 1 < 11) {
      oldTips[active].active = true;
    }
    setTips(oldTips);
    setActive(active + 1);
  }

  const generateColors = () => {
    let newColors = [];
    let existsColors = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * existsColors.length);
      newColors.push(existsColors[random]);
      existsColors.splice(random, 1);
    }
    setColors(newColors);
  }

  useEffect(() => {
    //console.log(colors);
  }, [colors]);

  useEffect(() => {
    generateColors();
  }, [])

  const startGame = () => {
    generateColors();
    setColorsVisible(false);
    let oldTips = [...tips];
    for (let i = 0; i < oldTips.length; i++) {
      if (i === 0) {
        oldTips[i].active = true;
      } else {
        oldTips[i].active = false;
      }
      oldTips[i].tips = [];
    }
    setTips(oldTips);
    setActive(1);
    setNewGame(true);
  }

  return (
    <Body>
      <GlobalStyle />
      <label className="simple-mode">
        Egyszerűsített verzió{` `}
        <input type="checkbox" checked={simple} onChange={() => setSimple(!simple)} />
      </label>
      <Hamburger className={showMenu ? 'open' : 'close'} onClick={() => setShowMenu(!showMenu)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </Hamburger>
      <Menu showMenu={showMenu} startGame={startGame} />
      <h1 className="x-hidden">Színözön</h1>
      <Table colors={colors} tips={tips} colorsVisible={colorsVisible} voteTip={voteTip} newGame={newGame} setNewGame={setNewGame} simple={simple} />
      <button className="start-btn x-hidden" onClick={startGame}>Új játék</button>
    </Body>
  )
}

const Body = styled.div`
  align-items: center;
  background: rgb(180,180,180);
  display: flex;
  flex-direction: column;
  gap: .5rem;
  height:100vh;
  padding-top: 2rem;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  min-width: 500px;

  @media screen and (max-width: 500px) {
    min-width: 300px;
  }
  @media screen and (max-width: 350px) {
    min-width: 250px;
  }

  .x-hidden {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  .x-show {
    display: none;
    @media screen and (max-width: 500px) {
      display: block;
    }
  }

  .simple-mode {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.1rem;
  }

  .start-btn {
    margin-top: 1rem;
    padding: .5rem;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1rem;
    background: transparent;
    border: none;
    box-shadow: 0 0 2px 1px black;
    outline: none;
    transition: .25s all;
    &:hover {
      box-shadow: 0 2px 4px 2px black;
      background: #00afe0;
    }
    cursor: pointer;
  }

`;

const Hamburger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  flex-direction: column;
  gap: .5rem;
  overflow: hidden;
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 20;
  cursor: pointer;

  .line {
    width: 80%;
    height: .25rem;
    background: black;
    transition: .25s all;
    opacity: 1
  }

  &.open {
    .line {
      :nth-child(1) {
        transform: rotate(45deg) translate( .5rem, .5rem);
      }
      :nth-child(2) {
        opacity: 0;
        transform: translateX(-100%);
      }
      :nth-child(3) {
        transform: rotate(-45deg)  translate( .5rem, -.5rem);
      }
    }
  }
`;

export default App;
