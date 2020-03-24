/*
 Convert 'A5' to
 */
export function positionToNumber(position, width) {
  if (width === undefined) {
    throw Error('need to specify width for numberToPosition');
  }
  position = position.toUpperCase().replace(/[^0-9A-Z]/g, '');
  let string = position.replace(/[0-9]+/, '');
  let number = position.replace(/[A-Z]+/, '');
  return (stringToNumber(string) - 1) * width + number * 1;
}

export function numberToPosition(number, width) {
  if (width === undefined) {
    throw Error('need to specify width for numberToPosition');
  }
  number--;
  return (
    numberToString(Math.floor(number / width) + 1) + ((number % width) + 1)
  );
}

export function stringToNumber(string) {
  let number = 0;
  for (let i = 0; i < string.length; i++) {
    number *= 26;
    number += string.charCodeAt(i) - 64;
  }
  return number;
}

export function numberToString(number) {
  let string = '';
  while (number != 0) {
    string = String.fromCharCode(((number - 1) % 26) + 65) + string;
    number = Math.floor((number - 1) / 26);
  }
  return string;
}
