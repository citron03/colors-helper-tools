import React, { useState } from 'react';
import * as cht from 'colors-helper-tools';

export default function App() {
  const bgColor = cht.pasteltoneHex();
  return (
    <div>
      <button
        style={{
          backgroundColor: bgColor,
          color: fontColor,
        }}
        onClick={() => console.log('background color is ', bgColor)}
      >
        Get Ready for the color
      </button>
    </div>
  );
}
