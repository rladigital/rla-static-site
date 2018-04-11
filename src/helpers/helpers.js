import { breakpoints } from "../theme/theme";
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function scale(width, screenWidth) {
    return width / 1800 * window.innerWidth;
}
export function transformScale(size) {
    return Math.min(window.innerWidth, window.innerHeight) / size;
}
export function hexToInt(hexString) {
    return parseInt(hexString.substring(1), 16);
}
export function hextoRgb(hexString) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}
export function transparentize(hexString, amount) {
    var rgb = hextoRgb(hexString);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - amount})`;
}
export const isBrowser = new Function(
    "try {return this===window;}catch(e){ return false;}"
);
export const isMobile = () => {
    return window.innerWidth < breakpoints.medium;
};
export const serveStatic = () => {
    return !isBrowser() || (isBrowser() && isMobile());
};
