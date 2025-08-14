import { chromium } from 'playwright-extra';

export const searchImages = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ success: false, message: "Search query is required." });
  }

  const searchText = encodeURIComponent(query.trim());
  const url = `https://unsplash.com/s/photos/${searchText}`;

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });

  // Add stealth tweak
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for images to load
    await page.waitForSelector('figure[itemprop="image"] img', { timeout: 15000 });

    // Scroll down to lazy load more images
    await page.evaluate(async () => {
      const distance = 500;
      for (let i = 0; i < 5; i++) {
        window.scrollBy(0, distance);
        await new Promise(r => setTimeout(r, 500));
      }
    });

    // Wait additional time for images to load
    await page.waitForTimeout(2000);

    // Extract image info (up to 10)
    const results = await page.$$eval('figure[itemprop="image"] img', imgs => {
  return imgs
    .filter(img => {
      // Exclude profile pics by URL containing "crop=faces&fit=crop&h=32"
      return !img.src.includes('crop=faces') && !img.src.includes('h=32');
    })
    .slice(0, 20)
    .map(img => ({
      alt: img.alt || 'No title',
      src: img.src || img.getAttribute('data-src'),
    }));
});


    await browser.close();

    return res.status(200).json({
      success: true,
      data: results,
    });

  } catch (error) {
    console.error("Unsplash scraping error:", error);
    await browser.close();
    return res.status(500).json({ success: false, message: "Failed to fetch images from Unsplash." });
  }
};
