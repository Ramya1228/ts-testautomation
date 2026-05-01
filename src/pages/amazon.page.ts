import { Page, BrowserContext, Browser } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for Amazon-specific UI actions.
 */
export class AmazonPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    /**
     * Fill the 'Search Amazon' field with the provided text.
     * @param {string} searchText - The text to enter in the search field.
     */
    async fillSearchField(searchText: string): Promise<void> {
        await this.page.getByRole('searchbox', { name: 'Search Amazon' }).fill(searchText);
    }

    /**
     * Click the 'Go' button to submit the search.
     */
    async clickSearchButton(): Promise<void> {
        await this.page.getByRole('button', { name: 'Go', exact: true }).click();
    }

    /**
     * Click the first non-sponsored product link (Logitech M185 Wireless Mouse) in the search results.
     */
    async clickFirstProductLink(): Promise<void> {
        await this.page.getByRole('link', { name: 'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey', exact: true }).click();
    }

    /**
     * Click the 'Add to cart' button on the product details page.
     */
    async clickAddToCart(): Promise<void> {
        await this.page.getByRole('button', { name: 'Add to cart', exact: true }).click();
    }

    /**
     * Click the cart icon or link to go to the cart page.
     * Note: Locator for 'Go to Cart' is not specified in test_steps_to_implement, so this is a placeholder.
     * Update the locator as needed when available.
     */
    async clickGoToCart(): Promise<void> {
        // Example placeholder: update with actual locator if available
        await this.page.getByRole('link', { name: 'Cart' }).click();
    }
}
