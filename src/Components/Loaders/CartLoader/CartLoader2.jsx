import React from 'react';
import styled from 'styled-components';

const AddToCartLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    position: relative;
  }

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0px;
    height: 0px;
    border-radius: 100%;
    opacity: 0;
    animation: pulse_4923 4s infinite linear;
    border: 0.5px solid #f3f3f3;
    box-shadow: 0px 0px 5px #eef0e5;
  }

  .circle:nth-child(1) {
    animation-delay: .2s;
  }

  .circle:nth-child(2) {
    animation-delay: .4s;
  }

  .circle:nth-child(3) {
    animation-delay: .8s;
  }

  .circle:nth-child(4) {
    animation-delay: 1s;
  }

  @keyframes pulse_4923 {
    0% {
      opacity: 0.0;
      width: 0px;
      height: 0px;
      transform: translate(-50%, -50%) scale(1);
    }

    10% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(2);
    }

    100% {
      opacity: 0.0;
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%) scale(1);
    }
  }`;

export default AddToCartLoader;
