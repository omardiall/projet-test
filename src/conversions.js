// Fonctions pures de conversion

function convertLength(value, from, to) {
  if (from === to) return value;
  const toMeter = {
    meter: 1,
    kilometer: 1000,
    foot: 0.3048,
    inch: 0.0254,
    yard: 0.9144,
    mile: 1609.344
  };
  const fromMeter = {
    meter: 1,
    kilometer: 1/1000,
    foot: 1/0.3048,
    inch: 1/0.0254,
    yard: 1/0.9144,
    mile: 1/1609.344
  };
  const valueInMeters = value * toMeter[from];
  const result = valueInMeters * fromMeter[to];
  return Number(result.toFixed(4));
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let result = null;
  if (from === 'celsius') {
    if (to === 'fahrenheit') result = value * 9/5 + 32;
    if (to === 'kelvin') result = value + 273.15;
  }
  if (from === 'fahrenheit') {
    if (to === 'celsius') result = (value - 32) * 5/9;
    if (to === 'kelvin') result = (value - 32) * 5/9 + 273.15;
  }
  if (from === 'kelvin') {
    if (to === 'celsius') result = value - 273.15;
    if (to === 'fahrenheit') result = (value - 273.15) * 9/5 + 32;
  }
  return result !== null ? Number(result.toFixed(2)) : null;
}

function convertWeight(value, from, to) {
  if (from === to) return value;
  const toGram = {
    gram: 1,
    kilogram: 1000,
    pound: 453.59237
  };
  const fromGram = {
    gram: 1,
    kilogram: 1/1000,
    pound: 1/453.59237
  };
  const valueInGrams = value * toGram[from];
  const result = valueInGrams * fromGram[to];
  return Number(result.toFixed(4));
}

function convertVolume(value, from, to) {
  if (from === to) return value;
  const toLiter = {
    liter: 1,
    gallon: 3.78541
  };
  const fromLiter = {
    liter: 1,
    gallon: 1/3.78541
  };
  const valueInLiters = value * toLiter[from];
  const result = valueInLiters * fromLiter[to];
  return Number(result.toFixed(4));
}

module.exports = {
  convertLength,
  convertTemperature,
  convertWeight,
  convertVolume
}; 