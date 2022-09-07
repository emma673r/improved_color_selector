"use strict";

// ********************************* ASSIGNMENT *********************************************

//! You should have separate functions for at least:
// blue is DONE

//*? Getting a selected color from the user
//*? Showing a selected color (possibly a delegator for the following function calls)
//*? Showing the color as a colored box in CSS
//*? Showing the color as hex
//*? Showing the color as RGB
//*? Showing the color as HSL
//*? Converting hex to RGB
//*? Converting RGB to CSS usable string, like rgb(100, 123, 192);
//*? Converting RGB to hex
//*? Converting RGB to HSL

// ******************************************************************************************

window.addEventListener("DOMContentLoaded", start);

// all const

const colorBox = document.querySelector(".colorbox");
const input = document.querySelector("#colorwheel");
const colorCodes = document.querySelector("#colorCodes");
const h1 = document.querySelector("h1");

const hexValue = document.querySelector(".hex");
const rgbValue = document.querySelector(".rgb");
const hslValue = document.querySelector(".hsl");

let r;
let g;
let b;

// *CONTROLLER

// start
function start() {
  //   console.log("start");

  hexValue.textContent = ``;
  rgbValue.textContent = ``;
  hslValue.textContent = ``;

  input.addEventListener("input", getInput);
}

function getInput() {
  let hex = input.value;

  displayColorInColorBox(hex);
  showHex(hex);
  convertHexToRGB(hex);

  return hex;
}

// *MODEL

function convertHexToRGB(hex) {
  // console.log(`convertHexToRGB`);
  r = hex.substring(1, 3).toUpperCase().toString();
  g = hex.substring(3, 5).toUpperCase().toString();
  b = hex.substring(5).toUpperCase().toString();

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  convertRGBStringToRGB(r, g, b);

  let rgbObj = { r, g, b };

  rgbToHSL(rgbObj);

  return rgbObj;
}

function convertRGBStringToRGB(r, g, b) {
  // console.log(`convertRGBStringToRGB`);
  // console.log(r, g, b);
  let rgbCSS = `rgb(${r}, ${g}, ${b})`;

  showRGB(rgbCSS);
  return rgbCSS;
}

function rgbToHSL(rgbObj) {
  // console.log("rgbToHSL");

  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;

  //   *** paste code

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  //   *** end pasted code

  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  let hslObj = { h, s, l };

  showHSL(hslObj);
  return hslObj;
}

// *** VIEW

function displayColorInColorBox(hex) {
  colorBox.style.backgroundColor = hex;
  h1.style.color = hex;
}

function showHex(hex) {
  hexValue.textContent = hex.toUpperCase();
}

function showRGB(rgbCSS) {
  rgbValue.textContent = rgbCSS;
}

function showHSL(hslObj) {
  hslValue.textContent = "hsl: " + hslObj.h + "° " + hslObj.s + "% " + hslObj.l + "%";
}
