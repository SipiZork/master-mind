import React from 'react';
import styled from 'styled-components';
import { convertColors } from '../utils/colors';

const Line = ({ colors, colorsVisible }) => {

  return (
    <StyledLine>
      <Left>
      </Left>
      <Right>
        {colorsVisible ?
          <div className="tips">
            <div className="tip">
              <div className="circle" style={{ background: colors ? convertColors(colors[0]) : 'grey' }}></div>
            </div>
            <div className="tip">
              <div className="circle" style={{ background: colors ? convertColors(colors[1]) : 'grey' }}></div>
            </div>
            <div className="tip">
              <div className="circle" style={{ background: colors ? convertColors(colors[2]) : 'grey' }}></div>
            </div>
            <div className="tip">
              <div className="circle" style={{ background: colors ? convertColors(colors[3]) : 'grey' }}></div>
            </div>
          </div > : 
          <div className="cover"></div>
        }
      </Right>
    </StyledLine>
  )
}

const StyledLine = styled.div`
  display: grid;
  grid-template-columns: .16fr 1fr;
  height: calc(100% / 11);
  border-bottom: 1px solid rgba(0,0,0,.25);
  `;

const Left = styled.div`
  
`;


const Right = styled.div`
  .tips {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 100%;

    .tip {
      align-items: center;
      display: flex;
      justify-content: center;

      .circle {
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        background: red;
        box-shadow: inset 0 2px 10px 2px rgba(0,0,0,1);
      }
    }
  }

  .cover {
    width: 95%;
    height: 80%;
    background: rgb(120,120, 120);
    margin: .5rem auto;
    box-shadow: 0px -2px 1px 1px black;
                
  }
`;

export default Line;