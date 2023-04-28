import { complementaryColorHex, toRgb } from ".";

console.log("===== test start =====");

const testHex = "#ff00ff";

console.log("toRgb", toRgb(testHex));
console.log("complementaryColorHex", complementaryColorHex(testHex));
