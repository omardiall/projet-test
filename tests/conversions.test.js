
const { convertLength, convertTemperature, convertWeight, convertVolume } = require('../src/conversions');

describe('convertLength', () => {
  it('convertit mètres en pieds', () => {
    expect(Number(convertLength(1, 'meter', 'foot'))).toBeCloseTo(3.28084, 4);
  });
  it('convertit pieds en mètres', () => {
    expect(Number(convertLength(1, 'foot', 'meter'))).toBeCloseTo(0.3048, 4);
  });
  it('convertit kilomètres en miles', () => {
    expect(Number(convertLength(1, 'kilometer', 'mile'))).toBeCloseTo(0.6214, 3);
  });
  it('convertit pouces en yards', () => {
    expect(Number(convertLength(36, 'inch', 'yard'))).toBeCloseTo(1, 4);
  });
});

describe('convertTemperature', () => {
  it('convertit Celsius en Fahrenheit', () => {
    expect(Number(convertTemperature(0, 'celsius', 'fahrenheit'))).toBeCloseTo(32, 2);
  });
  it('convertit Kelvin en Celsius', () => {
    expect(Number(convertTemperature(273.15, 'kelvin', 'celsius'))).toBeCloseTo(0, 2);
  });
  it('convertit Fahrenheit en Kelvin', () => {
    expect(Number(convertTemperature(32, 'fahrenheit', 'kelvin'))).toBeCloseTo(273.15, 2);
  });
});

describe('convertWeight', () => {
  it('convertit kilogrammes en livres', () => {
    expect(Number(convertWeight(1, 'kilogram', 'pound'))).toBeCloseTo(2.2046, 3);
  });
  it('convertit livres en grammes', () => {
    expect(Number(convertWeight(1, 'pound', 'gram'))).toBeCloseTo(453.592, 1);
  });
});

describe('convertVolume', () => {
  it('convertit litres en gallons', () => {
    expect(Number(convertVolume(1, 'liter', 'gallon'))).toBeCloseTo(0.2642, 3);
  });
  it('convertit gallons en litres', () => {
    expect(Number(convertVolume(1, 'gallon', 'liter'))).toBeCloseTo(3.7854, 3);
  });
}); 