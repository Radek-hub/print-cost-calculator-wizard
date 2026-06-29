import { chromium, devices } from "playwright";

const URL = "http://localhost:5173/";

async function testMobileInteraction(name, contextOptions, interaction) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: /see what/i });
  await trigger.waitFor({ state: "visible" });

  const before = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    navHasBackdropBlur: getComputedStyle(document.querySelector("nav")).backdropFilter !== "none",
    navBackground: getComputedStyle(document.querySelector("nav")).backgroundColor,
  }));

  await interaction(trigger);

  await page.waitForTimeout(600);

  const after = await page.evaluate(() => {
    const openDialog = document.querySelector('[role="dialog"][data-state="open"]');
    const visibleContent = document.body.innerText.includes("Magic import");
    const sheetBottom = !!document.querySelector('[data-state="open"][class*="slide-in-from-bottom"]');

    return {
      openDialog: !!openDialog,
      visibleContent,
      sheetBottom,
      dialogClass: openDialog?.className?.slice(0, 120) ?? null,
    };
  });

  await browser.close();

  return { name, before, after };
}

const iphone = devices["iPhone 14"];

const results = [];

results.push(
  await testMobileInteraction(
    "iphone-click",
    { ...iphone, isMobile: true, hasTouch: true },
    async (trigger) => trigger.click()
  )
);

results.push(
  await testMobileInteraction(
    "iphone-tap",
    { ...iphone, isMobile: true, hasTouch: true },
    async (trigger) => trigger.tap()
  )
);

console.log(JSON.stringify(results, null, 2));

const failed = results.filter((r) => !r.after.openDialog || !r.after.visibleContent);
if (failed.length > 0) {
  console.error("FAILED interactions:", failed.map((r) => r.name).join(", "));
  process.exit(1);
}

console.log("All mobile interaction tests passed");
