import React from 'react';
import styled from 'styled-components';
import simpleRuleImg from '../assets/images/rules.png';
import mainRules from '../assets/images/mainrules.png';
import mainRulesExplation from '../assets/images/mainrules-explanation.png';

const Menu = ({ showMenu, startGame }) => {
  return (
    <StyledMenu className={showMenu ? 'open' : 'close'}>
      <div className="top-hide"></div>
        <button className="start-btn x-show" onClick={startGame}>Új játék</button>
      <h1 className="x-show">Színözön</h1>
      <h2>Szabályok</h2>
      <p>
        A játék kezdetekor a játék kiválaszt 6 szinből 4 véletlenszerű színt és véletlenszerű sorrendben elrejti a lefelső sorban. <br />
        A játékos célja, hogy soronként megtippelve kitalálja a fenti színeket és azok sorrendjét, amiben a játék tippelési mező mellett balra elhelyzkedő találat jelző pálcikák lesznek segítségére.
      </p>
      <h3>Jelzések</h3>
      <ul>
        <li>Jelöletlen: Nincs találat</li>
        <li>Fehér: A szín talált, de a helye <span>nem azonos</span> a fentivel</li>
        <li>Fekete: A szín talált és a helye is <span>azonos</span> a fentiekkel</li>
      </ul>
      <h3>A játék vége</h3>
      <p>A játéknak akkor van vége, ha a játékos kitalálta a színeket és azok sorrendjét, akkor a játékos nyert, vagy ha elfogytak a tippelésre fentartott sorok, ekkor a játékos vesztett.</p>
      <h3>Alap verzió</h3>
      <p>
      Ebben a módban a jelző pálcák csak annyit jeleznek, hogy van e szín egyezés, illetve, hogy van e szín megfelelő pozícióban. Nem adnak iránymutatást arról, hogy melyik szín vagy jó helyen és melyik talált, csak a tényt közlik, hogy van találat. Először a fekete pálcák jelzik, hogy hány olyan találat van ami jó helyen is van, majd fehér pálcák jelzik, hogy hány találat, de nincs jó helyen. Ha maradt üresen jelelő hely, akkor valamelyik szín nem talált.
      </p>
      <img src={mainRules} alt="main-rule" />
      <p>A képen látható példán annyit látunk, hogy három színt eltaláltunk, ebből egy jó helyen van (fekete jelölés) és kettő talált de rossz helyen (két fehér jelölés). Azt nem tudjuk, hogy melyikekről van szó.</p>
      <img src={mainRulesExplation} alt="explanation" />
      <p>Ezen a képen láthatjuk, hogy az első zöld szín talált, csak rossz helyen van, a második sötétkék talált és jó helyen is van, a harmadik világoskék egyáltalán nem talált, az utolsó sárga pedig találat, de rossz helyen van.</p>
      <h3>Egyszerűsített verzió</h3>
      <p>
        Az egyszerűsített verzióban a találat jelző pálcikák pontosan jelzik, hogy melyik megtippelt szín van jó helyen, melyik talált, de van rossz helyen, és melyik nem talált. Teszik ezt olyan módon, hogy a találat jelőlök balról-jobbra, illetve fentről-lefelé jelzik a mezők helyet.
      </p>
      <img src={simpleRuleImg} alt="simple-rule" />
      <p>A képen látható példában:
      </p>
      <ul>
        <li>első (türkisz) talált és jó helyen van (bal felső fekete jelölés)</li>
        <li>második (sárga) talált de rossz helyen van (jobb felső fehér jelölés)</li>
        <li>harmadik (zöld) egyáltalán nem talált (bal alsó üresen hagyott jelölés)</li>
        <li>negyedik (rózsaszín) talált, de rossz helyen van (jobb alsó fehér jelölés)</li>
      </ul>
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position:absolute;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100vh;
  background: rgb(230,230,230);
  padding-top: 5rem;
  transition: .25s all;
  opacity: 0;
  z-index: 10;
  transform: translateX(-100%);
  box-shadow: 5px 0 5px 2px rgba(0,0,0,.35);
  padding: 0 1.5rem 1.5rem;
  overflow-y:scroll;
  overflow-x: hidden;

  @media screen and (max-width: 500px) {
    width: 100%;
  }

  .start-btn {
    margin: .5rem auto 1rem;
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

  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .top-hide {
    position: sticky;
    top: 0;
    height: 5rem;
    width: 100%;
    background: rgb(230,230,230);
  }

  &::-webkit-scrollbar {
    width: .3rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color:  rgb(150,150,150);
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &.open {
    transform: translateX(0);
    opacity: 1;
  }

  img {
    width: 100%;
  }

  h3, p {
    margin-bottom: 1rem;
    text-align: justify;
  }

  h3 {
    margin-bottom: .5rem;    
  }

  ul {
    padding-left: 1.2rem;
    margin-bottom: 1rem;

    span {
      text-transform: uppercase;
      text-decoration: underline;
    }
  }
`;

export default Menu;