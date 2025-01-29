import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledWrapper>
      <div className="input">
        <input type="text" required autoComplete="off" />
        <label htmlFor="name">Email</label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1em 0;
    max-width: 130px;
    position: relative;
  }

  .input input {
    font-size: 100%;
    padding: 0.6em;
    outline: none;
    border: 2px solid #ebff57;
    background-color: transparent;
    border-radius: 20px;
    width: 150%;
  }

  .input label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.1em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(255, 255, 255);
  }

  .input :is(input:focus, input:valid)~label {
    transform: translateY(-50%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: #3E3F38;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: #ebff57;
  }`;

export default Input;
