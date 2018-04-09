import { breakpoints } from "../theme/theme";
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function scale(width, screenWidth) {
    return width / 1800 * window.innerWidth;
}
export function hexToInt(hexString) {
    return parseInt(hexString.substring(1), 16);
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
