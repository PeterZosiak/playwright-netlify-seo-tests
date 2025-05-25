import { type Page } from '@playwright/test';
import BasePage from './basePage';

export default class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigates to the home page of the application.
     */
    async goto() {
        await this.page.goto('/');
    }
}