import React from 'react';
import * as cht from 'colors-helper-tools';
import styled from '@emotion/styled';

interface DivProps {
  bgColor: string;
  fontColor: string;
}

const Div = styled.div<DivProps>`
  background: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
`;

export default function App() {
  const fontColor = cht.pasteltoneHex();
  const bgColor = cht.complementaryColorHex(fontColor);
  return (
    <div>
      <p>test</p>
      <Div bgColor={bgColor} fontColor={fontColor}>
        Get Ready for the color
      </Div>
    </div>
  );
}
