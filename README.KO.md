# 🎨 colors-helper-tools

색상 조작 및 생성에 필요한 모든 것을 위한 가볍고 강력한 TypeScript 라이브러리입니다. 개발을 더욱 다채롭게 만드세요! ✨

[![npm version](https://badge.fury.io/js/colors-helper-tools.svg)](https://badge.fury.io/js/colors-helper-tools)

## 설치

```bash
# npm
$ npm install --save colors-helper-tools

# yarn
$ yarn add colors-helper-tools

# pnpm
$ pnpm add colors-helper-tools
```

## 빠른 시작

새롭고 직관적인 체인형 API를 만나보세요. 이 라이브러리를 사용하는 권장 방법입니다.

```ts
import cht from 'colors-helper-tools';

const primaryColor = '#8A2BE2'; // BlueViolet

// 완벽한 색상을 얻기 위해 메서드를 체인합니다.
const newColor = cht(primaryColor)
  .lighten(0.1)
  .complementary()
  .darken(0.05)
  .hex();

console.log(newColor); // 예: '#84e85a'
```

## API 참조

주요 내보내기는 `cht` 팩토리 함수이며, 이 함수는 메서드를 체인할 수 있는 새 색상 객체를 생성합니다.

`cht(color: string | { red: number, green: number, blue: number })`

### 체인형 메서드

이 메서드들은 색상을 수정하고 추가 체인을 위해 인스턴스를 반환합니다.

- `.lighten(amount: number)`: 색상을 더 밝게 만듭니다. `amount`는 0에서 1 사이입니다.
- `.darken(amount: number)`: 색상을 더 어둡게 만듭니다. `amount`는 0에서 1 사이입니다.
- `.complementary()`: 색상을 보색으로 변환합니다.
- `.palette(type, count)`: 색상 팔레트를 생성합니다. 
  - `type`: `'monochromatic'`, `'complementary'`, `'analogous'`, `'triadic'`, `'split-complementary'`.
  - `count`: 팔레트의 색상 수 (단색 팔레트에만 해당).

  ```ts
  const triadicPalette = cht('#ff0000').palette('triadic');
  // Cht 객체 배열을 반환합니다: [red, green, blue]
  ```

### 분석 메서드

- `.contrast(anotherColor)`: 현재 색상과 다른 색상 간의 WCAG 대비 비율을 계산합니다. 1에서 21 사이의 값을 반환합니다.
  - `anotherColor`: 헥스 문자열, RGB 객체 또는 다른 Cht 인스턴스일 수 있습니다.

  ```ts
  const white = cht('#FFFFFF');
  const black = cht('#000000');
  const ratio = white.contrast(black); // 21
  ```

### 출력 메서드

이 메서드들은 원하는 형식으로 최종 색상 값을 반환합니다.

- `.hex()`: 색상을 헥스 문자열로 반환합니다 (예: `#ffffff`).
- `.rgb()`: 색상을 RGB 객체로 반환합니다 (예: `{ red: 255, green: 255, blue: 255 }`).
- `.hsl()`: 색상을 HSL 객체로 반환합니다 (예: `{ h: 0.5, s: 1, l: 0.5 }`).
- `.hsv()`: 색상을 HSV 객체로 반환합니다 (예: `{ h: 0.5, s: 1, v: 0.5 }`).

---

### 독립형 함수 (레거시)

이 함수들은 여전히 사용 가능하지만, 새로운 체인형 API를 사용하는 것이 권장됩니다.

- `lightenHex(hex, amount)` / `lightenRgb(rgb, amount)`
- `darkenHex(hex, amount)` / `darkenRgb(rgb, amount)`
- `complementaryColorHex(hex)` / `complementaryColorRgb(rgb)`
- `getRandomColorHex()` / `getRandomColorRgb()`
- `pasteltoneHex()` / `pasteltoneRgb()`
- `neutraltoneHex()` / `neutraltoneRgb()`
- `getColorByStepHex(step)` / `getColorByStepRgb(step)`
- `getColorByStepHexGen(step)` / `getColorByStepRgbGen(step)`

## 명령줄 인터페이스 (CLI)

이 패키지에는 터미널에서 빠른 색상 작업을 위한 편리한 CLI도 포함되어 있습니다.

```sh
# 도움말 보기
npx cht -h

# 무작위 색상 생성
npx cht random

# 기본 색상에서 삼색 팔레트 생성
npx cht palette triadic #ff0000

# 두 색상 간의 대비 비율 계산
npx cht contrast #ffffff #000000

# 색상을 HSL 형식으로 변환
npx cht convert #3498db --to hsl
```

## 문서

포괄적인 가이드, API 참조 및 예제는 공식 문서 사이트를 방문하십시오.

[문서 방문](https://your-docusaurus-site.example.com)

## 예제

다양한 환경에서의 실제 사용 예제를 참조하십시오:
- <a href="./examples/emotion_example.tsx">Emotion (CSS-in-JS)</a>
- <a href="./examples/jsx_inline_example.tsx">React 인라인 스타일</a>
- <a href="./examples/react_memo_example.tsx">`React.memo`를 사용한 React</a>
- <a href="./examples/complementary_example.tsx">보색</a>

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)에 따라 라이선스가 부여됩니다.
