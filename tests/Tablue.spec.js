import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 695 });
  await page.goto(
    "https://dashboards.doh.nj.gov/views/DailyConfirmedCaseSummary7_22_2020/ConfirmedCases?%3Aembed=y&%3AisGuestRedirectFromVizportal=y&%3Arender=true"
  );
});
