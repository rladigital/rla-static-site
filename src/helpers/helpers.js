import { breakpoints } from "../theme/theme";
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function scale(width, screenWidth) {
    return width / 1800 * window.innerWidth;
}
export function transformScale(size, limit) {
    if (limit) {
        return Math.min(window.innerWidth, window.innerHeight, limit) / size;
    } else {
        return Math.min(window.innerWidth, window.innerHeight) / size;
    }
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
export function chunkArray(chunk_size, myArray) {
    var i = 0;
    var chunk;
    var tempArray = [];

    for (i = 0; i < myArray.length; i += chunk_size) {
        chunk = myArray.slice(i, i + chunk_size);
        tempArray.push(chunk);
    }

    return tempArray;
}
export function randomChunkArray(arr, min, max) {
    var arr = arr.slice();
    var arrs = [],
        size = 1;
    var min = min || 1;
    var max = max || min || 1;
    while (arr.length > 0) {
        size = Math.min(max, Math.floor(Math.random() * max + min));
        arrs.push(arr.splice(0, size));
    }
    return arrs;
}
export function shuffleArray(o) {
    for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
}
