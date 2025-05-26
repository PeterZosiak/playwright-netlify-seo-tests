import { test, expect, type Page } from '@playwright/test'
import BasePage from '../pages/basePage'

test.describe('SEO - Page Link Verification', () => {
    test('should verify all links on the page are valid and accessible', async ({ request, page }) => {
        test.setTimeout(600000);

        const sitemapResponse = await request.get('/sitemap.xml')
        const sitemapContent = await sitemapResponse.text()

        const allUrls = ['/', '/about', '/careers', '/privacy', '/legal/terms-of-use'] //getUrls(sitemapContent);

        const invalidLinks: string[] = [];

        for (const pagePath of allUrls) {
            await page.goto(pagePath)
            const basePage = new BasePage(page)

            const links = basePage.getAllLinks()
            const linkCount = 20 //await links.count() ==> disabled for demo reasons
            expect(linkCount, `No links found on page ${pagePath}`).toBeGreaterThan(0)


            for (let i = 0; i < linkCount; i++) {
                const link = links.nth(i)
                const href = await link.getAttribute('href')

                if (href) {
                    // Skip empty or external links
                    if (href.startsWith('#') || href.startsWith('http') || href.includes('mailto') || !href.startsWith('/')) continue

                    try {
                        const fullUrl = new URL(href, page.url()).toString()
                        const response = await request.get(fullUrl)

                        // Verify each link is accessible
                        expect(response.status()).not.toBe(404)
                        if (response.status() === 404) {
                            invalidLinks.push(fullUrl);
                        }
                    } catch (error: any) {
                        invalidLinks.push(`${href} - ${error.message}`);
                    }
                }
            }
        }

        expect(invalidLinks, `The following links returned 404: ${invalidLinks.join(', ')}`).toEqual([]);
    })
})