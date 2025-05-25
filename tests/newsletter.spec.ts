import { test, expect, type Page } from '@playwright/test'
import NewsletterFormComponent from '../pages/components/newsletterFormComponent'
import ThankYouPage from '../pages/thankYouPage'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('Newsletter Subscription', () => {
    test('should subscribe with a valid email', async ({ page }) => {
        const newsletterForm = new NewsletterFormComponent(page)
        const email = 'valid@email.com'
        await newsletterForm.subcribe(email)

        // Verify that the subscription was successful
        const thankYouPage = new ThankYouPage(page)
        await expect(thankYouPage.thankYouMessage()).toBeVisible()
        await expect(thankYouPage.thankYouMessage()).toHaveText('Thank you for signing up!')
        await expect(thankYouPage.documentationButton()).toBeVisible()
        await expect(thankYouPage.chatButton()).toBeVisible()
    });

    ['email', 'email@email'].forEach((email) => {
        test(`should not subscribe with an invalid email: ${email}`, async ({ page }) => {
            const newsletterForm = new NewsletterFormComponent(page)
            await newsletterForm.subcribe(email)

            // Verify that nothing happens on the page
            await expect(newsletterForm.emailInput()).toBeVisible()
            await expect(newsletterForm.emailInput()).toHaveValue(email)
        })
    });
})