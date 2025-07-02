// @ts-check
const { test, expect } = require('@playwright/test');

const APP_URL = 'http://localhost:8080'; 

test.describe('Convertisseur d\'unités - E2E', () => {
  test('Conversion longueur (mètres → pieds)', async ({ page }) => {
    await page.goto(APP_URL);
    await page.fill('#length-value', '2');
    await page.selectOption('#length-from', 'meter');
    await page.selectOption('#length-to', 'foot');
    await page.click('#length-converter button[type="submit"]');
    await expect(page.locator('#length-result')).toContainText('2 meter = 6.5617 foot');
  });

  test('Conversion monnaie (EUR → USD)', async ({ page }) => {
    await page.goto(APP_URL);
    
    await page.waitForSelector('#currency-from option[value="eur"]');
    await page.fill('#currency-value', '10');
    await page.selectOption('#currency-from', 'eur');
    await page.selectOption('#currency-to', 'usd');
    await page.click('#currency-converter button[type="submit"]');
    await expect(page.locator('#currency-result')).toContainText('10 EUR =');
    await expect(page.locator('#currency-result')).toContainText('USD');
  });

  test('Ajout d\'une conversion aux favoris', async ({ page }) => {
    await page.goto(APP_URL);
    await page.fill('#weight-value', '5');
    await page.selectOption('#weight-from', 'kilogram');
    await page.selectOption('#weight-to', 'pound');
    await page.click('#weight-converter button[type="submit"]');
    await page.click('#add-favorite-weight');
    await expect(page.locator('#favorites-list')).toContainText('5 kilogram → pound');
  });

  test('Conversion et vérification de l\'historique', async ({ page }) => {
    await page.goto(APP_URL);
    await page.fill('#volume-value', '3');
    await page.selectOption('#volume-from', 'liter');
    await page.selectOption('#volume-to', 'gallon');
    await page.click('#volume-converter button[type="submit"]');
    await expect(page.locator('#history-list')).toContainText('3 liter → gallon');
  });
}); 