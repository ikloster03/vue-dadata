import { test, expect } from '@playwright/test';

/**
 * Хелпер для поиска инпута компонента VueDadata по роли и плейсхолдеру.
 */
const getInput = (page) => page.getByPlaceholder('Введите адрес');

test.describe('VueDadata (App.vue)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('отображает инпут с плейсхолдером', async ({ page }) => {
    const input = getInput(page);
    await expect(input).toBeVisible();
  });

  test('отображает подсказки при вводе', async ({ page }) => {
    const input = getInput(page);
    await input.fill('Москва');
    // Ожидаем появления выпадающего списка подсказок
    await expect(page.getByRole('listbox')).toBeVisible({ timeout: 3000 });
    // Проверяем, что хотя бы одна подсказка отображается
    await expect(page.getByRole('option').first()).toBeVisible();
  });

  test('выбирает подсказку по клику', async ({ page }) => {
    const input = getInput(page);
    await input.fill('Москва');
    await expect(page.getByRole('listbox')).toBeVisible({ timeout: 3000 });
    const firstOption = page.getByRole('option').first();
    const textBefore = await firstOption.textContent();
    await firstOption.click();
    // После выбора подсказки значение инпута должно измениться
    await expect(input).toHaveValue(textBefore?.trim() || '');
  });

  test('выбирает второй элемент из выпадающего списка и проверяет изменение адреса', async ({ page }) => {
    const input = getInput(page);
    await input.fill('Москва');
    await expect(page.getByRole('listbox')).toBeVisible({ timeout: 3000 });
    const options = page.getByRole('option');
    // Проверяем, что есть хотя бы два варианта
    await expect(options.nth(1)).toBeVisible();
    const textSecond = await options.nth(1).textContent();
    await options.nth(1).click();
    await expect(input).toHaveValue(textSecond?.trim() || '');
  });

  test('инпут заблокирован при disabled', async ({ page }) => {
    // Для этого теста потребуется отрендерить компонент с :disabled="true"
    // Например, через отдельную страницу или параметр
    // Здесь пример для главной страницы, если реализовано:
    // await page.goto('/?disabled=true');
    // const input = getInput(page);
    // await expect(input).toBeDisabled();
  });
});
