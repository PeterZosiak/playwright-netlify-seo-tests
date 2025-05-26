# Playwright Netlify SEO Testing Suite

A comprehensive end-to-end testing suite for validating SEO aspects and functionality of the Netlify website using Playwright.

## Project Overview

This project provides automated testing for critical SEO elements and user functionality on the Netlify website, including:

- **Newsletter subscription functionality** with form validation
- **Sitemap accessibility and crawlability verification**
- **Meta tags and robots directives validation**
- **Page indexability and SEO compliance checks**


## Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-netlify-seo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Suites
```bash
# Newsletter functionality tests
npx playwright test newsletter.spec.ts

# SEO and sitemap tests
npx playwright test sitemap.spec.ts
```

### Generate and View Test Reports
```bash
# Run tests and generate HTML report
npx playwright test --reporter=html

# View the generated report
npx playwright show-report
```



## Testing Approach

### Page Object Model (POM)
We use the Page Object Model pattern to:
- **Encapsulate page interactions** in reusable classes
- **Improve test maintainability** by centralizing element selectors
- **Enhance code reusability** across different test scenarios
- **Provide clear separation** between test logic and page structure

### Test Categories

#### 1. Newsletter Subscription Tests (`newsletter.spec.ts`)
- **Valid email subscription flow** - End-to-end happy path testing
- **Invalid email format validation** - Form validation and error handling
- **Success page verification** - Post-subscription user experience

#### 2. SEO & Crawlability Tests (`sitemap.spec.ts`)
- **Sitemap accessibility** - Validates sitemap.xml exists and is properly formatted
- **URL accessibility** - Verifies all sitemap URLs are reachable
- **Robots meta tag validation** - Ensures proper indexing directives
- **Crawlability verification** - Confirms important pages are accessible to search engines
- **Robots.txt validation** - Checks robots.txt configuration

### Key Features
- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Parallel test execution** for faster results
- **Detailed HTML reporting** with screenshots and traces
- **Retry mechanisms** for flaky test handling
- **Configurable timeouts** and wait strategies

## Configuration

The main configuration is in `playwright.config.ts`:

- **Base URL**: `https://www.netlify.com`


## Assumptions and Limitations

### Assumptions
1. **Website Availability**: Tests assume the Netlify website (`https://www.netlify.com`) is accessible and operational
2. **Page Structure Stability**: Tests rely on specific CSS selectors and page structures remaining consistent
3. **Newsletter Form Functionality**: Assumes the newsletter subscription form is present and functional on the homepage
4. **Sitemap Format**: Expects standard XML sitemap format at `/sitemap.xml`
5. **Meta Tag Standards**: Assumes standard HTML meta tag implementations for SEO elements

### Current Limitations
1. **Static URL Testing**: Currently tests against production Netlify site only
2. **Limited Error Scenarios**: Some edge cases and error conditions may not be fully covered
3. **Form Submission**: Newsletter tests don't verify actual email delivery, only form interaction
4. **Rate Limiting**: Sitemap URL testing may be affected by rate limiting on target site
5. **Authentication**: Tests don't cover authenticated or user-specific content areas

### Known Issues
1. **Sitemap Size**: Large sitemaps may cause extended test execution times
