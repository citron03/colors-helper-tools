# colors-helper-tools

[![npm version](https://img.shields.io/npm/v/colors-helper-tools.svg)](https://www.npmjs.com/package/colors-helper-tools)
[![npm downloads](https://img.shields.io/npm/dm/colors-helper-tools.svg)](https://www.npmjs.com/package/colors-helper-tools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

색상 작업, 팔레트 생성, 명암비 계산 등을 도와주는 다용도 라이브러리 및 CLI 도구입니다. ✨

## 주요 기능

- **플루언트 API**: 직관적인 색상 조작을 위한 메서드 체이닝을 지원합니다.
- **색상 변환**: `HEX`, `RGB`, `HSL`, `HSV` 형식 간의 변환을 지원합니다.
- **색상 수정**: `lighten`(밝게), `darken`(어둡게), `complementary`(보색) 기능을 쉽게 사용할 수 있습니다.
- **팔레트 생성**: 다양한 유형의 색상 팔레트를 생성합니다:
  - `monochromatic` (단색)
  - `complementary` (보색)
  - `analogous` (유사색)
  - `triadic` (삼색)
  - `split-complementary` (분할 보색)
  - `shades` (명암)
  - `tints` (색조)
  - `tones` (톤)
- **명암비 계산**: 색상 조합의 접근성을 확인하기 위해 명암비를 계산합니다.
- **랜덤 색상**: 파스텔 및 뉴트럴 톤을 포함한 랜덤 색상을 생성합니다.
- **CLI 도구**: 터미널에서 대부분의 기능에 직접 접근할 수 있습니다.

## 설치

```bash
npm install colors-helper-tools
```

## 라이브러리 사용법

이 라이브러리는 색상을 래핑하고 플루언트 API를 사용할 수 있게 해주는 `cht` 메인 함수를 제공합니다.

```javascript
import cht, { getRandomColorHex } from 'colors-helper-tools';

// --- 기본 사용법 ---
const myColor = cht('#3498db');

console.log(myColor.hex()); // #3498db
console.log(myColor.rgb()); // { red: 52, green: 152, blue: 219 }

// --- 메서드 체이닝 ---
const lightenedComplementary = cht('#3498db')
  .complementary()
  .lighten(0.2)
  .hex();
console.log(lightenedComplementary); // #ffde99 (예시 출력)

// --- 팔레트 생성 ---
const triadicPalette = cht('#e74c3c').palette('triadic');
console.log(triadicPalette.map(c => c.hex())); // ['#e74c3c', '#3ce74c', '#4c3ce7'] (예시 출력)

// --- 명암비 계산 ---
const contrastRatio = cht('#ffffff').contrast('#3498db');
console.log(contrastRatio.toFixed(2)); // 4.26

// --- 랜덤 색상 ---
const randomColor = getRandomColorHex();
console.log(randomColor); // 예: #a8d8b2
```

## CLI 사용법

`cht` 커맨드 라인 도구를 사용할 수도 있습니다.

```bash
# 3개의 랜덤 HEX 색상 얻기
cht random 3

# 5개의 랜덤 RGB 색상을 얻어 파일로 저장하기
cht random 5 --rgb --file

# 랜덤 색상 생성을 위한 대화형 프롬프트 시작하기
cht get_random

# 기본 색상으로 5가지 색상의 단색 팔레트 생성하기
cht palette monochromatic "#3498db" 5

# 두 색상 간의 명암비 얻기
cht contrast "#ffffff" "#000000"

# 색상을 HSL 형식으로 변환하기
cht convert "#3498db" --to hsl
```

### CLI 명령어

- `cht random [number] [--rgb] [--file]`: N개의 랜덤 색상을 가져옵니다.
- `cht get_random`: 랜덤 색상 생성을 위한 대화형 프롬프트를 시작합니다.
- `cht palette <type> <color> [count]`: 색상 팔레트를 생성합니다.
- `cht contrast <color1> <color2>`: 명암비를 계산합니다.
- `cht convert <color> --to <format>`: 색상 형식을 변환합니다 (hex, rgb, hsl).
- `cht --help`: 모든 명령어와 옵션을 표시합니다.

## 기여

기여는 언제나 환영입니다! 편하게 Pull Request를 제출하거나 이슈를 열어주세요.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
