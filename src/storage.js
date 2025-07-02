
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
  }
}

function removeFavorite(index) {
  const favs = getFavorites();
  favs.splice(index, 1);
  saveFavorites(favs);
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
}

function removeHistory(index) {
  const hist = getHistory();
  hist.splice(index, 1);
  saveHistory(hist);
}

module.exports = {
  getFavorites,
  saveFavorites,
  addFavorite,
  removeFavorite,
  getHistory,
  saveHistory,
  addHistory,
  removeHistory
}; 