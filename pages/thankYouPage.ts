import { Page } from '@playwright/test'
import BasePage from './basePage'


export default class ThankYouPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    public thankYouMessage = () => this.page.locator('h1')
    public documentationButton = () => this.page.locator('a[id="cta-hero-docs"]')
    public chatButton = () => this.page.locator('a[id="cta-hero-answers"]')
}