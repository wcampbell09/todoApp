import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByPlaceholder('To-do').click();
    await page.getByPlaceholder('To-do').fill('new todo');
    await page.getByPlaceholder('To-do').press('Enter');
    await expect (page.locator('#new-todo')).toHaveText('new todo')
    await page.locator('#new-todo').dblclick();
    await page.locator('#new-todo').fill('update todo');
    await page.getByLabel('').nth(2).press('Enter');
    await page.locator('#update-todo-x-button').click();
    await expect(page.locator('#new-todo')).toHaveCount(0)
    await page.getByPlaceholder('To-do').click();
    await page.getByPlaceholder('To-do').fill('add another todo');
    await page.getByPlaceholder('To-do').press('Enter');
    await page.getByPlaceholder('To-do').fill('and another');
    await page.getByPlaceholder('To-do').press('Enter');
    await expect (page.locator('#add-another-todo')).toHaveText('add another todo')
    await expect (page.locator('#and-another')).toHaveText('and another')
    await page.locator('#and-another-checkbox').click()
    await expect(page.locator('#and-another-checkbox')).toBeChecked(true)

});
