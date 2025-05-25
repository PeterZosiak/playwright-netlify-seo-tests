import { Page } from '@playwright/test'

export default class BasePage {
    constructor(public page: Page) { }

    public getPage = () => this.page

    public getTitle = () => this.page.title()

    public getBody = () => this.page.locator('body')

    public getDescription = () => this.getMetaContent('meta[name="description"]')

    public getMetaRobots = () => this.getMetaContent('meta[name="robots"]')

    private async getMetaContent(name: string): Promise<string | null> {
        const metaRobotsLocator = this.page.locator(name);
        if (await metaRobotsLocator.count() > 0) {
            const content = await metaRobotsLocator.first().getAttribute('content');
            return content === null ? "" : content;
        } else {
            return "";
        }
    }

    public getAllLinks = () => this.page.locator('a')
}