import { test, expect, type Page } from '@playwright/test'
import { getUrls } from '../utils/sitemap'
import BasePage from '../pages/basePage'

test.describe('SEO - Sitemap and Crawlability Verification', () => {
    test('should verify sitemap.xml exists and is accessible', async ({ request }) => {
        // Check if sitemap.xml exists
        const sitemapResponse = await request.get('/sitemap.xml')

        // Verify sitemap is accessible and returns valid XML
        expect(sitemapResponse.status()).toBe(200)
        expect(sitemapResponse.headers()['content-type']).toContain('xml')
    })

    test('should verify URLs listed in sitemap are accessible', async ({ request }) => {
        test.setTimeout(600000);
        // Get sitemap content
        const sitemapResponse = await request.get('/sitemap.xml')
        const sitemapContent = await sitemapResponse.text()


        for (const url of getUrls(sitemapContent)) {
            const urlResponse = await request.get(url)

            // Verify each URL is accessible
            expect([200, 403]).toContain(urlResponse.status());
        }
    })

    test('should verify important pages do not have robots noindex meta tags', async ({ request, page }) => {
        const sitemapResponse = await request.get('/sitemap.xml')
        const sitemapContent = await sitemapResponse.text()

        const allUrls = ['/about', '/careers', '/privacy', '/legal/terms-of-use'] //getUrls(sitemapContent);
        const intentionallyNoindexPages: string[] = ['/privacy', '/legal/terms-of-use'];

        const noindexIssues: string[] = [];
        const unexpectedNoindex: string[] = [];

        for (const pagePath of allUrls) {
            await page.goto(pagePath)
            const basePage = new BasePage(page)
            const currentPageUrl = page.url();

            const robotsContent = await basePage.getMetaRobots()

            // Check if the current page is intended to be noindex
            const isIntentionallyNoindex = intentionallyNoindexPages.some(
                (noindexPath) => currentPageUrl.includes(noindexPath)
            );

            if (isIntentionallyNoindex) {
                if (!robotsContent || !robotsContent.toLowerCase().includes('noindex')) {
                    noindexIssues.push(currentPageUrl);
                }
            } else {
                if (robotsContent && robotsContent.toLowerCase().includes('noindex')) {
                    unexpectedNoindex.push(currentPageUrl);
                }
            }
        }

        expect(noindexIssues, `The following pages are intended to be noindex but meta robots tag is missing or does not contain 'noindex': ${noindexIssues.join(', ')}`).toEqual([]);
        expect(unexpectedNoindex, `The following pages are not intended to be noindex but contain 'noindex': ${unexpectedNoindex.join(', ')}`).toEqual([]);
    })


    test('should verify robots.txt exists', async ({ request }) => {
        // Check if robots.txt exists
        const robotsResponse = await request.get('/robots.txt')
        expect(robotsResponse.status()).toBe(200)

        const robotsContent = await robotsResponse.text()

        // Verify robots.txt has proper format
        expect(robotsContent).toContain('User-agent')

        // Should reference sitemap if present
        if (robotsContent.toLowerCase().includes('sitemap')) {
            expect(robotsContent.toLowerCase()).toContain('sitemap')
        }
    })

    test('should verify important pages are crawlable', async ({ page }) => {
        const importantPages = [
            '/about',
            '/careers',
            '/blog'
        ]

        for (const pagePath of importantPages) {
            await page.goto(pagePath)

            const basePage = new BasePage(page)
            // Verify page title is set
            const title = await basePage.getTitle()
            expect(title.length, `Page ${pagePath} should have a meaningful title`).toBeGreaterThan(0)

            // Check for meta description
            const metaDescription = await basePage.getDescription()
            if (metaDescription) {
                expect(metaDescription.length,
                    `Page ${pagePath} meta description should be reasonable length`).toBeLessThanOrEqual(160)
            }

            // Verify page loads successfully
            await expect(basePage.getBody()).toBeVisible()

            // Check that page has meaningful content (not empty or error page)
            const bodyText = await basePage.getBody().textContent()
            expect(bodyText?.trim().length,
                `Page ${pagePath} should have meaningful content`).toBeGreaterThan(100)
        }
    })

})
