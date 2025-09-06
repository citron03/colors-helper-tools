import React from 'react';
import * as cht from 'colors-helper-tools';
import styled from '@emotion/styled';

interface ButtonProps {
  bgColor: string;
  fontColor: string;
}

const Button = styled.div<ButtonProps>`
  background: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
`;

export default function App() {
  return (
    <div>
      <p>test</p>
      <Button
        bgColor={cht.getRandomColorHex()}
        fontColor={cht.getRandomColorHex()}
      >
        Get Ready for the color
      </Button>
    </div>
  );
}
