// Fonctions de conversion
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


const FAVORITES_KEY = 'unit_converter_favorites';
function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}
function saveFavorites(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}
function addFavorite(fav) {
  const favs = getFavorites();
  if (!favs.some(f => JSON.stringify(f) === JSON.stringify(fav))) {
    favs.push(fav);
    saveFavorites(favs);
    renderFavorites();
  }
}
function removeFavorite(index) {
  const favs = getFavorites();
  favs.splice(index, 1);
  saveFavorites(favs);
  renderFavorites();
}


const HISTORY_KEY = 'unit_converter_history';
function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}
function saveHistory(hist) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
}
function addHistory(entry) {
  const hist = getHistory();
  hist.unshift(entry);
  saveHistory(hist.slice(0, 20));
  renderHistory();
}
function removeHistory(index) {
  const hist = getHistory();
  hist.splice(index, 1);
  saveHistory(hist);
  renderHistory();
}


const lengthForm = document.getElementById('length-converter');
const lengthValue = document.getElementById('length-value');
const lengthFrom = document.getElementById('length-from');
const lengthTo = document.getElementById('length-to');
const lengthResult = document.getElementById('length-result');
const addFavoriteBtn = document.getElementById('add-favorite');
const favoritesList = document.getElementById('favorites-list');
const historyList = document.getElementById('history-list');

const tempForm = document.getElementById('temp-converter');
const tempValue = document.getElementById('temp-value');
const tempFrom = document.getElementById('temp-from');
const tempTo = document.getElementById('temp-to');
const tempResult = document.getElementById('temp-result');
const addFavoriteTempBtn = document.getElementById('add-favorite-temp');

const weightForm = document.getElementById('weight-converter');
const weightValue = document.getElementById('weight-value');
const weightFrom = document.getElementById('weight-from');
const weightTo = document.getElementById('weight-to');
const weightResult = document.getElementById('weight-result');
const addFavoriteWeightBtn = document.getElementById('add-favorite-weight');

const volumeForm = document.getElementById('volume-converter');
const volumeValue = document.getElementById('volume-value');
const volumeFrom = document.getElementById('volume-from');
const volumeTo = document.getElementById('volume-to');
const volumeResult = document.getElementById('volume-result');
const addFavoriteVolumeBtn = document.getElementById('add-favorite-volume');

const currencyForm = document.getElementById('currency-converter');
const currencyValue = document.getElementById('currency-value');
const currencyFrom = document.getElementById('currency-from');
const currencyTo = document.getElementById('currency-to');
const currencyResult = document.getElementById('currency-result');
const addFavoriteCurrencyBtn = document.getElementById('add-favorite-currency');


function renderFavorites() {
  favoritesList.innerHTML = '';
  const favs = getFavorites();
  if (favs.length === 0) {
    favoritesList.innerHTML = '<li class="text-gray-400">Aucun favori</li>';
    return;
  }
  favs.forEach((fav, i) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between';
    li.innerHTML = `<span>${fav.label}</span> <button class="ml-2 text-red-500 hover:underline" data-index="${i}">Supprimer</button>`;
    favoritesList.appendChild(li);
  });
  favoritesList.querySelectorAll('button[data-index]').forEach(btn => {
    btn.addEventListener('click', e => {
      removeFavorite(parseInt(btn.dataset.index));
    });
  });
}

function renderHistory() {
  historyList.innerHTML = '';
  const hist = getHistory();
  if (hist.length === 0) {
    historyList.innerHTML = '<li class="text-gray-400">Aucun historique</li>';
    return;
  }
  hist.forEach((entry, i) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between';
    li.innerHTML = `<span>${entry.label}</span> <button class="ml-2 text-red-500 hover:underline" data-index="${i}">Supprimer</button>`;
    historyList.appendChild(li);
  });
  historyList.querySelectorAll('button[data-index]').forEach(btn => {
    btn.addEventListener('click', e => {
      removeHistory(parseInt(btn.dataset.index));
    });
  });
}


lengthForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const value = parseFloat(lengthValue.value);
  const from = lengthFrom.value;
  const to = lengthTo.value;
  const result = convertLength(value, from, to);
  if (result !== null) {
    lengthResult.textContent = `${value} ${from} = ${result} ${to}`;
    addHistory({
      type: 'length',
      label: `${value} ${from} → ${to} = ${result}`,
      value, from, to
    });
  } else {
    lengthResult.textContent = 'Conversion non supportée.';
  }
});
addFavoriteBtn.addEventListener('click', function () {
  const value = parseFloat(lengthValue.value);
  const from = lengthFrom.value;
  const to = lengthTo.value;
  const result = convertLength(value, from, to);
  if (result !== null) {
    addFavorite({
      type: 'length',
      label: `${value} ${from} → ${to} = ${result}`,
      value, from, to
    });
  }
});


if (tempForm) {
  tempForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = parseFloat(tempValue.value);
    const from = tempFrom.value;
    const to = tempTo.value;
    const result = convertTemperature(value, from, to);
    if (result !== null) {
      tempResult.textContent = `${value} ${from} = ${result} ${to}`;
      addHistory({
        type: 'temperature',
        label: `${value} ${from} → ${to} = ${result}`,
        value, from, to
      });
    } else {
      tempResult.textContent = 'Conversion non supportée.';
    }
  });
  addFavoriteTempBtn.addEventListener('click', function () {
    const value = parseFloat(tempValue.value);
    const from = tempFrom.value;
    const to = tempTo.value;
    const result = convertTemperature(value, from, to);
    if (result !== null) {
      addFavorite({
        type: 'temperature',
        label: `${value} ${from} → ${to} = ${result}`,
        value, from, to
      });
    }
  });
}


if (weightForm) {
  weightForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = parseFloat(weightValue.value);
    const from = weightFrom.value;
    const to = weightTo.value;
    const result = convertWeight(value, from, to);
    if (result !== null) {
      weightResult.textContent = `${value} ${from} = ${result} ${to}`;
      addHistory({
        type: 'weight',
        label: `${value} ${from} → ${to} = ${result}`,
        value, from, to
      });
    } else {
      weightResult.textContent = 'Conversion non supportée.';
    }
  });
  addFavoriteWeightBtn.addEventListener('click', function () {
    const value = parseFloat(weightValue.value);
    const from = weightFrom.value;
    const to = weightTo.value;
    const result = convertWeight(value, from, to);
    if (result !== null) {
      addFavorite({
        type: 'weight',
        label: `${value} ${from} → ${to} = ${result}`,
        value, from, to
      });
    }
  });
}


if (volumeForm) {
  volumeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = parseFloat(volumeValue.value);
    const from = volumeFrom.value;
    const to = volumeTo.value;
    const result = convertVolume(value, from, to);
    if (result !== null) {
      volumeResult.textContent = `${value} ${from} = ${result} ${to}`;
      addHistory({
        type: 'volume',
        label: `${value} ${from} → ${to} = ${result}`,
        value, from, to
      });
    } else {
      volumeResult.textContent = 'Conversion non supportée.';
    }
  });
  addFavoriteVolumeBtn.addEventListener('click', function () {
    const value = parseFloat(volumeValue.value);
    const from = volumeFrom.value;
    const to = volumeTo.value;
    const result = convertVolume(value, from, to);
    if (result !== null) {
      addFavorite({
        type: 'volume',
        label: `${value} ${from} → ${to} = ${result}`,
        value, from, to
      });
    }
  });
}


async function loadCurrencies() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    const data = await res.json();
    for (const [code, name] of Object.entries(data)) {
      const option1 = document.createElement('option');
      option1.value = code;
      option1.textContent = `${code.toUpperCase()} - ${name}`;
      const option2 = option1.cloneNode(true);
      currencyFrom.appendChild(option1);
      currencyTo.appendChild(option2);
    }
    currencyFrom.value = 'eur';
    currencyTo.value = 'usd';
  } catch (e) {
    currencyResult.textContent = 'Erreur lors du chargement des monnaies.';
  }
}
if (currencyFrom && currencyTo) loadCurrencies();

async function convertCurrency(value, from, to) {
  if (from === to) return value;
  try {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`);
    const data = await res.json();
    const rate = data[from][to];
    if (!rate) return null;
    return (value * rate).toFixed(4);
  } catch (e) {
    return null;
  }
}

if (currencyForm) {
  currencyForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const value = parseFloat(currencyValue.value);
    const from = currencyFrom.value;
    const to = currencyTo.value;
    currencyResult.textContent = 'Conversion en cours...';
    const result = await convertCurrency(value, from, to);
    if (result !== null) {
      currencyResult.textContent = `${value} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}`;
      addHistory({
        type: 'currency',
        label: `${value} ${from.toUpperCase()} → ${to.toUpperCase()} = ${result}`,
        value, from, to
      });
    } else {
      currencyResult.textContent = 'Conversion non supportée ou erreur API.';
    }
  });
  addFavoriteCurrencyBtn.addEventListener('click', async function () {
    const value = parseFloat(currencyValue.value);
    const from = currencyFrom.value;
    const to = currencyTo.value;
    const result = await convertCurrency(value, from, to);
    if (result !== null) {
      addFavorite({
        type: 'currency',
        label: `${value} ${from.toUpperCase()} → ${to.toUpperCase()} = ${result}`,
        value, from, to
      });
    }
  });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
  renderHistory();
}); 