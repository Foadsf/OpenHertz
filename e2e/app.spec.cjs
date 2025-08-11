const { test, expect } = require('@playwright/test');

test.describe('OpenHertz UI', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the local index.html file
    await page.goto('file://' + __dirname + '/../index.html');
  });

  test('should update the UI when changing contact type', async ({ page }) => {
    // Check initial state (Sphere-Plane)
    const contactImage = page.locator('#contactType');
    await expect(contactImage).toHaveAttribute('src', 'pics/SpherePlane.PNG');
    const secondRadiusInput = page.locator('#secondRadius');
    await expect(secondRadiusInput).toBeHidden();

    // Change contact type to Sphere-Sphere
    const contactTypeDropdown = page.locator('#contactTypeList');
    await contactTypeDropdown.selectOption('2');

    // Assert that the UI has updated
    await expect(contactImage).toHaveAttribute('src', 'pics/SphereSphere.PNG');
    await expect(secondRadiusInput).toBeVisible();

    // Change contact type to Cylinder-Plane
    await contactTypeDropdown.selectOption('3');
    await expect(contactImage).toHaveAttribute('src', 'pics/CylinderPlane.PNG');
    await expect(secondRadiusInput).toBeHidden();
    const cylinderLengthInput = page.locator('#cylinderLength');
    await expect(cylinderLengthInput).toBeVisible();
  });
});
