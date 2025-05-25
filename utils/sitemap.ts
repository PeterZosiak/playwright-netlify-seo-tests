/**
 * Utility function to extract URLs from a sitemap XML string.
 * @param sitemapContent The content of the sitemap XML as a string.
 * @returns An array of URLs extracted from the sitemap.
 */
export const getUrls = (sitemapContent: string): string[] => {
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    if (!urlMatches) return [];

    // Extract actual URLs
    return urlMatches.map(match => match.replace('<loc>', '').replace('</loc>', '')).slice(0, 10);
}