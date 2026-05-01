/**
 * Amazon Add-to-Cart End-to-End Test
 *
 * This test covers the following scenario:
 * 1. Launch Chrome and navigate to https://www.amazon.com and verify the homepage loads successfully.
 * 2. Enter "Wireless Mouse" in the search bar and click Search.
 * 3. Select the first non-sponsored product from the search results.
 * 4. Click "Add to Cart" on the product details page.
 * 5. Open the Cart and verify the correct product is added with quantity 1.
 *
 * All UI actions are performed using the AmazonPage object.
 * Debug logging is included at each step.
 */

import { test, expect } from '@playwright/test';
import { AmazonPage } from '../src/pages/amazon.page';
import { baseTest } from './test-base';

// Use baseTest if provided, otherwise fallback to Playwright's test
const it = baseTest || test;

/**
 * Test suite for Amazon add-to-cart scenario.
 */
it.describe('Amazon Add-to-Cart E2E', () => {
  /**
   * End-to-end test: Search, select product, add to cart, and verify cart contents.
   */
  it('should search for a wireless mouse, add to cart, and verify cart contents', async ({ page }) => {
    // Instantiate the AmazonPage object
    const amazon = new AmazonPage(page);

    // Step 1: Navigate to Amazon homepage
    console.log('[DEBUG] Navigating to https://www.amazon.com');
    await page.goto('https://www.amazon.com');
    await expect(page).toHaveURL(/amazon\.com/);
    await expect(page).toHaveTitle(/Amazon/);
    console.log('[DEBUG] Amazon homepage loaded successfully');

    // Step 2: Fill the search field with 'Wireless Mouse'
    console.log('[DEBUG] Filling search field with "Wireless Mouse"');
    await amazon.fillSearchField('Wireless Mouse');

    // Step 3: Click the search button
    console.log('[DEBUG] Clicking search button');
    await amazon.clickSearchButton();

    // Step 4: Click the first non-sponsored product link
    console.log('[DEBUG] Selecting the first non-sponsored product');
    await amazon.clickFirstProductLink();

    // Step 5: Click 'Add to Cart' on the product details page
    console.log('[DEBUG] Clicking "Add to Cart" button');
    await amazon.clickAddToCart();

    // Step 6: Go to Cart
    console.log('[DEBUG] Navigating to Cart');
    await amazon.clickGoToCart();

    // Step 7: Verify the correct product is added with quantity 1
    console.log('[DEBUG] Verifying cart contents');
    // Minimal verification: check that at least one item with 'Wireless Mouse' is present and quantity is 1
    const cartItem = await page.getByText(/Wireless Mouse/i).first();
    await expect(cartItem).toBeVisible();
    const quantityInput = await cartItem.locator('xpath=../../..').getByRole('combobox');
    await expect(quantityInput).toHaveValue('1');
    console.log('[DEBUG] Cart verification successful');
  });
});
