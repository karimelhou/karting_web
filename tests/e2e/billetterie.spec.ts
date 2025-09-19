import { test, expect } from '@playwright/test';

test('reservation wizard flow', async ({ page }) => {
  await page.goto('/fr');
  await page
    .getByRole('link', { name: /Billetterie/ })
    .first()
    .click();
  await page.waitForURL('**/billetterie');

  await page.getByLabel('Date').fill('2024-05-20');
  await page.getByLabel('Créneau horaire').fill('14:30');
  await page.getByRole('button', { name: 'Suivant' }).click();

  await page.getByLabel('Adultes').fill('4');
  await page.getByLabel('Ados').fill('1');
  await page.getByLabel('Enfants (3+)').fill('0');
  await page.getByLabel('Nom').fill('Test Client');
  await page.getByLabel('E-mail').fill('test@example.com');
  await page.getByLabel('Téléphone').fill('0123456789');
  await page.getByRole('button', { name: 'Suivant' }).click();

  await page.getByLabel('Formule').click();
  await page.getByRole('option', { name: 'Grand Prix', exact: true }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();

  await page.getByRole('button', { name: 'Valider' }).click();

  await expect(page.getByText(/Votre demande est bien enregistrée/)).toBeVisible();
});
