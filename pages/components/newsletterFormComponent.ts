export default class NewsletterFormComponent {
    constructor(private page: any) {
    }

    private wrapper = () => this.page.locator('.newsletter-form');
    public emailInput = () => this.wrapper().locator('input[name="email"]');
    public submitButton = () => this.wrapper().locator('input[type="submit"]');

    /**
     * Subscribes to the newsletter with the provided email.
     * @param email The email address to subscribe with.
     */
    public async subcribe(email: string) {
        await this.emailInput().fill(email);
        await this.submitButton().click();

    }
}