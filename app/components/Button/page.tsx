'use client'
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: rgb(44, 0, 119);
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  padding: 15px 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const StylizedButton = ({ onClick, children }:any) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default StylizedButton;
