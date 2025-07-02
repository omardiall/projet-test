
const {
  getFavorites, saveFavorites, addFavorite, removeFavorite,
  getHistory, saveHistory, addHistory, removeHistory
} = require('../src/storage');


beforeEach(() => {
  localStorage.clear();
});

describe('Favoris', () => {
  it('ajoute un favori et le retrouve', () => {
    addFavorite({ type: 'length', label: '1 m → ft = 3.2808', value: 1, from: 'meter', to: 'foot' });
    const favs = getFavorites();
    expect(favs.length).toBe(1);
    expect(favs[0].type).toBe('length');
  });
  it('supprime un favori', () => {
    addFavorite({ type: 'length', label: '1 m → ft = 3.2808', value: 1, from: 'meter', to: 'foot' });
    removeFavorite(0);
    expect(getFavorites().length).toBe(0);
  });
  it('évite les doublons exacts', () => {
    const fav = { type: 'length', label: '1 m → ft = 3.2808', value: 1, from: 'meter', to: 'foot' };
    addFavorite(fav);
    addFavorite(fav);
    expect(getFavorites().length).toBe(1);
  });
});

describe('Historique', () => {
  it('ajoute une entrée à l\'historique', () => {
    addHistory({ type: 'weight', label: '1 kg → lb = 2.2046', value: 1, from: 'kilogram', to: 'pound' });
    const hist = getHistory();
    expect(hist.length).toBe(1);
    expect(hist[0].type).toBe('weight');
  });
  it('supprime une entrée de l\'historique', () => {
    addHistory({ type: 'weight', label: '1 kg → lb = 2.2046', value: 1, from: 'kilogram', to: 'pound' });
    removeHistory(0);
    expect(getHistory().length).toBe(0);
  });
  it('limite l\'historique à 20 entrées', () => {
    for (let i = 0; i < 25; i++) {
      addHistory({ type: 'length', label: `test ${i}`, value: i, from: 'meter', to: 'foot' });
    }
    expect(getHistory().length).toBe(20);
  });
}); 