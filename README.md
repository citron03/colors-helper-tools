# 🎨 colors-helper

We help you use color.

### return types are Hex string or Color type

```typescript
type Color = {
  red: number;
  green: number;
  blue: number;
};
```

## functions

### toRgb

- hex color string to rgb object

### toHex

- make number to hex string

### toHexColor

- make numbers to hex color string

### complementaryColorHex

- get complementary color hex string

### complementaryColorRgb

- get complementary color object

### random color parms options (enum)

```ts
export enum RandomColorType {
  red = 'red',
  green = 'green',
  blue = 'blue',
  all = 'all',
}
```

### getRandomColorHex

- get random color hex string
- give params (red, green, blue) to get concrete random color hex

### getRandomColorRgb

- get random color object
- give params (red, green, blue) to get concrete random color object
