const puppeteer = require('puppeteer');
const path = require('path');

const fileUrl = (p) => 'file://' + path.resolve(p).replace(/\\/g, '/');

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Compatibility helper: some Puppeteer/Page versions may not have waitForTimeout
  const sleep = async (ms) => {
    if (page && typeof page.waitForTimeout === 'function') return page.waitForTimeout(ms);
    return new Promise((res) => setTimeout(res, ms));
  };

  // Function to test in a given viewport
  async function testViewport(name, viewport) {
    console.log(`\n=== Testing ${name} ===`);
    if (viewport) await page.setViewport(viewport);

    await page.goto(fileUrl(path.join(__dirname, '..', 'index.html')), { waitUntil: 'networkidle2' });

    // 1) Captions appear under each portfolio card
    const captions = await page.$$eval('.portfolio-caption', nodes => nodes.map(n => ({ text: n.innerText.trim(), visible: !!(n.offsetWidth || n.offsetHeight) })));
    console.log('Captions count:', captions.length);
    const missing = captions.filter(c => !c.visible || c.text.length === 0);
    if (missing.length === 0) console.log('PASS: All captions visible and non-empty');
    else console.log('FAIL: Some captions missing or empty', missing);

    // 2) Hover overlay still shows on desktop (skip for mobile emulation)
    if (!viewport || (viewport.width && viewport.width > 700)) {
      const firstItem = await page.$('.portfolio-item');
      if (!firstItem) { console.log('FAIL: No .portfolio-item found'); return; }
      // Ensure the element is in view and hover using ElementHandle.hover()
      await firstItem.evaluate(node => node.scrollIntoView({ block: 'center', inline: 'center' }));
      await firstItem.hover();
      await sleep(300);
      const overlayOpacity = await page.$eval('.portfolio-item .portfolio-overlay', el => {
        const s = window.getComputedStyle(el);
        return s.opacity;
      });
      console.log('Overlay computed opacity on hover:', overlayOpacity);
      if (parseFloat(overlayOpacity) > 0) console.log('PASS: Overlay visible on hover');
      else console.log('FAIL: Overlay not visible on hover');
    } else {
      console.log('SKIP: Hover test skipped for mobile viewport');
    }

    // 3) Clicking the eye icon opens the modal and shows project details
    const eye = await page.$('.portfolio-modal-btn');
    if (!eye) { console.log('FAIL: No .portfolio-modal-btn found'); return; }
  await eye.click();
  await sleep(300);

    const modalVisible = await page.$eval('#portfolioModal', el => {
      const s = window.getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity || '1') > 0;
    });
    console.log('Modal visible after click:', modalVisible);
    if (!modalVisible) console.log('FAIL: Modal not visible after clicking eye icon');

    // Check modal content presence
    const modalTitle = await page.$eval('#modalTitle', el => el.innerText.trim()).catch(()=>null);
    const modalDesc = await page.$eval('#modalDescription', el => el.innerText.trim()).catch(()=>null);
    console.log('Modal title present:', !!modalTitle, 'Modal desc present:', !!modalDesc);
    if (modalTitle && modalDesc) console.log('PASS: Modal populated with title and description');
    else console.log('FAIL: Modal missing title or description');

    // Close modal via close button
  const closeBtn = await page.$('#portfolioModal .close');
  if (closeBtn) await closeBtn.click();
  await sleep(200);
  }

  try {
    // Desktop test
    await testViewport('Desktop (1280x800)', { width: 1280, height: 800 });
    // Mobile test (iPhone X emulation)
    await testViewport('Mobile (iPhone X)', { width: 375, height: 812, isMobile: true, hasTouch: true });
  } catch (err) {
    console.error('Test run error:', err);
  } finally {
    await browser.close();
  }
}

run();
