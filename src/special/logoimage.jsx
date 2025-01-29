
import React from 'react';
import styled from 'styled-components';

const BackgroundImage = () => { 
  return (
    <StyledBackground>
      {/* Empty div to hold the background image */}
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("D:/demoapp/lancerapp/lance/lan/src/assets/bg.png"); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default BackgroundImage;