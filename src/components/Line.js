import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { convertColors, convertToNumber } from '../utils/colors';
import { GithubPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Line = ({ tip, voteTip, colorsVisible, newGame, setNewGame, simple }) => {
  
  const [voteable, setVoteable] = useState(false);
  const [colorPickerPos, setColorPickerPos] = useState({
    x: 0,
    y: 0
  });
  const [lineColors, setLineColors] = useState({
    visible: false,
    whichColor: null,
    color1: 'grey',
    color2: 'grey',
    color3: 'grey',
    color4: 'grey',
  });

  const setDefault = () => {
    setLineColors({
      visible: false,
      whichColor: null,
      color1: 'grey',
      color2: 'grey',
      color3: 'grey',
      color4: 'grey',
    });
    setVoteable(false);
  }

  useEffect(() => {
    if (newGame) {
      setDefault();
      setNewGame(false);
    }
  }, [newGame])

  useEffect(() => {
    const { color1, color2, color3, color4 } = lineColors;
    if (color1 !== 'grey' && color2 !== 'grey' && color3 !== 'grey' && color4 !== 'grey' && !voteable) {
      if (color1 !== color2 && color1 !== color3 && color1 !== color4 && color2 !== color3 && color2 !== color4 && color3 !== color4) {
        setVoteable(true);
      }
    } else {
      setVoteable(false);
    }
  }, [lineColors])

  const closeColorPicker = (e) => {
    setLineColors({ ...lineColors, [lineColors.whichColor]: e.hex, visible: false });
  }

  const showColorPicker = (e, color) => {
    if (!colorsVisible && e.target.classList.contains('circle')) {
      setColorPickerPos({ x: e.target.offsetLeft, y: e.target.offsetTop + e.target.clientHeight + 10 });
      if (tip.active) {
        setLineColors({ ...lineColors, visible: !lineColors.visible, whichColor: color });
      }
    }
  }

  const voteHandler = () => {
    if (voteable) {
      voteTip([convertToNumber(lineColors.color1), convertToNumber(lineColors.color2), convertToNumber(lineColors.color3), convertToNumber(lineColors.color4)]);
    }
  }

  const marker = (oneTip) => {
    if (simple) {
      return (
        <div className="markers">
          <div className="marker">
            <div className={`circle${oneTip.length > 0 && (oneTip[0].position || oneTip[0].color) ? ' pin' : ''}`} style={{ background: oneTip.length > 0 ? oneTip[0].position ? 'rgb(80,80,80)' : oneTip[0].color ? 'white' : 'grey' : 'grey' }}></div>
          </div>
          <div className="marker">
            <div className={`circle${oneTip.length > 0 && (oneTip[1].position || oneTip[1].color) ? ' pin' : ''}`} style={{ background: oneTip.length > 0 ? oneTip[1].position ? 'rgb(80,80,80)' : oneTip[1].color ? 'white' : 'grey' : 'grey' }}></div>
          </div>
          <div className="marker">
            <div className={`circle${oneTip.length > 0 && (oneTip[2].position || oneTip[2].color) ? ' pin' : ''}`} style={{ background: oneTip.length > 0 ? oneTip[2].position ? 'rgb(80,80,80)' : oneTip[2].color ? 'white' : 'grey' : 'grey' }}></div>
          </div>
          <div className="marker">
            <div className={`circle${oneTip.length > 0 && (oneTip[3].position || oneTip[3].color) ? ' pin' : ''}`} style={{ background: oneTip.length > 0 ? oneTip[3].position ? 'rgb(80,80,80)' : oneTip[3].color ? 'white' : 'grey' : 'grey' }}></div>
          </div>
        </div>
      );
    } else {
      let markers = ['grey', 'grey', 'grey', 'grey'];
      let goodPos = oneTip.filter(t => t.position && t.color);
      let goodColor = oneTip.filter(t => !t.position && t.color);
      for (let i = 0; i < goodPos.length; i++) {
        markers[i] = 'black';
      }
      for (let x = goodPos.length; x < goodPos.length + goodColor.length; x++ ) {
        markers[x] = 'white';
      }

      return (
        <div className="markers">
          {markers.map((marker,i) => 
            <div key={i} className="marker">
              <div className={`circle${oneTip.length > 0 && (markers[i] === 'black' || markers[i] === 'white') ? ' pin' : ''}`} style={{ background: markers[i] === 'black' ? 'rgba(80,80,80)' : markers[i] }}></div>
            </div>
          )}
        </div>
      );
    }
  }

  const lineTip = (oneTip) => {
    return (
      <div className = "tips">
        <div className="tip" onClick={(e) => showColorPicker(e, 'color1')}>
          {oneTip.length > 0 &&
            <div className="circle" style={{ background: convertColors(oneTip[0].number) }}></div>
          }
          {
            !oneTip.length > 0 && <div className="circle" style={{ background: lineColors.color1 }}></div>
          }
        </div>
        <div className="tip" onClick={(e) => showColorPicker(e, 'color2')}>
          {oneTip.length > 0 &&
            <div className="circle" style={{ background: convertColors(oneTip[1].number) }}></div>
          }
          {
            !oneTip.length > 0 && <div className="circle" style={{ background: lineColors.color2 }}></div>
          }
        </div>
        <div className="tip" onClick={(e) => showColorPicker(e, 'color3')}>
          {oneTip.length > 0 &&
            <div className="circle" style={{ background: convertColors(oneTip[2].number) }}></div>
          }
          {
            !oneTip.length > 0 && <div className="circle" style={{ background: lineColors.color3 }}></div>
          }
        </div>
        <div className="tip" onClick={(e) => showColorPicker(e, 'color4')}>
          {oneTip.length > 0 &&
            <div className="circle" style={{ background: convertColors(oneTip[3].number) }}></div>
          }
          {
            !oneTip.length > 0 && <div className="circle" style={{ background: lineColors.color4 }}></div>
          }
        </div>
        {lineColors.visible &&
          <div className="picker" style={{ left: colorPickerPos.x, top: colorPickerPos.y }}>
            <GithubPicker width='163px' onChangeComplete={closeColorPicker} color={lineColors.color1} colors={[convertColors(1), convertColors(2), convertColors(3), convertColors(4), convertColors(5), convertColors(6)]} />
          </div>
        }
        {tip.active && !colorsVisible &&
          <div className="send">
            <button onClick={() => voteHandler()}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: voteable ? 'rgba(0,255,0,.7)' : 'rgba(0,0,0,.7)' }} />
            </button>
          </div>
        }
      </div >
    )
  }

  return (
    <StyledLine>
      <Left>
        {marker(tip.tips)}
      </Left>
      <Right>
        {lineTip(tip.tips)}
      </Right>
    </StyledLine>
  )
}

const StyledLine = styled.div`
  display: grid;
  grid-template-columns: .15fr 1fr;
  height: calc(100% / 11);
  border-bottom: 1px solid rgba(0,0,0,.25);
  `;

const Left = styled.div`
  padding: 0.45rem;
  .markers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .25rem;
    height: 100%;

    .marker {
      align-items: center;
      display: flex;
      justify-content: center;

      .circle {
        border-radius: 50%;
        height: .75rem;
        width: .75rem;
        &.pin {
          box-shadow: inset 0 1px 3px 1px rgba(0,0,0,1);
        }
      }
    }
  }
`;


const Right = styled.div`

  .tips {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 100%;
    position: relative;

    .tip {
      align-items: center;
      display: flex;
      justify-content: center;

      .circle {
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        background: grey;
        box-shadow: inset 0 2px 10px 2px rgba(0,0,0,1);
      }
    }

    .picker {
      left: 0;
      position: absolute;
      top:0;
      z-index: 10;
    }

    .send {
      position: absolute;
      right: -2.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 2.2rem;
      
      button {
        background: transparent;
        outline: none;
        border: none;
        font-size: 2rem;
        color: rgba(0,255,0,.7);
      }
    }
  }
`;

export default Line;