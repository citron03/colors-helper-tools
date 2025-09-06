import React, { useMemo, useState } from 'react';
import * as cht from 'colors-helper-tools';

export default function App() {
  const bgColor = cht.pasteltoneHex(); // It changes on refresh
  const fontColor = useMemo(() => cht.getRandomColorHex(), []); // Doesn't change on refresh
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <button
        style={{
          backgroundColor: bgColor,
          color: fontColor,
        }}
        onClick={() => setRerender(prev => !prev)}
      >
        Get Ready for the color
      </button>
      <p>{rerender ? 'RE RENDER !!' : 'RE RENDER ~~'}</p>
    </div>
  );
}
