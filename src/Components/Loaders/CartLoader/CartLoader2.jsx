import React from "react";
import styled from "styled-components";

const AddToCartLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="box-load1" />
        <div className="box-load2" />
        <div className="box-load3" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    transition: all 0.4s;
  }

  .loader div {
    margin-left: 0.8rem;
    background-color: transparent;
    box-shadow: 0px 2px 2px black;
    border-radius: 3em;
    height: 1rem;
    width: 2rem;
  }

  .box-load1 {
    animation: brighten 1.5s infinite;
  }

  .box-load2 {
    animation: brighten 1.5s infinite;
    animation-delay: .3s;
  }

  .box-load3 {
    animation: brighten 1.5s infinite;
    animation-delay: .6s;
  }

  @keyframes brighten {
    100% {
       background-color: #2c541d;
    box-shadow: none;
    }
  }`;

export default AddToCartLoader;
