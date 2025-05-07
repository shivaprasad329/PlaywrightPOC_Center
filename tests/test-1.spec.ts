import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(
    "https://dashboards.doh.nj.gov/views/DailyConfirmedCaseSummary7_22_2020/ConfirmedCases?%3Aembed=y&%3AisGuestRedirectFromVizportal=y&%3Arender=true"
  );
  await expect(page.getByText("New Jersey Statistics: COVID-")).toBeVisible();
  await expect(
    page.locator("#title7082561269689932913_17637670920925986525")
  ).toContainText("New Jersey Statistics: COVID-19");
  await page
    .locator(
      "#tabZoneId107 > .tab-zone-margin > .tab-zone-padding > .tab-tiledViewer > .tab-clip"
    )
    .click();
  await page.getByLabel("BERGEN, County . Press Space").click();
  await page
    .locator("#view7082561269689932913_1533492169941227867 canvas")
    .nth(1)
    .click({
      position: {
        x: 252,
        y: 13,
      },
    });
  await expect(
    page.locator("#view7082561269689932913_1533492169941227867 canvas").nth(1)
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Start" }).click();
  await page.getByRole("cell", { name: "31" }).click();
  await page.getByRole("textbox", { name: "End" }).click();
  await page
    .locator("div")
    .filter({ hasText: "February" })
    .locator("span")
    .nth(1)
    .click();
  await page.getByText("January 2025").click();
  await page
    .locator("div")
    .filter({ hasText: "January 2025" })
    .locator("span")
    .nth(1)
    .click();
  await page.getByText("December").click();
  await page
    .locator("div")
    .filter({ hasText: "December" })
    .locator("span")
    .nth(1)
    .click();
  await page.getByRole("cell", { name: "M" }).click();
  await page
    .locator("#view7082561269689932913_6017753798065124242 canvas")
    .nth(1)
    .click({
      position: {
        x: 552,
        y: 19,
      },
    });
  await page.getByText("last updated 2/28/").click();
  await expect(
    page.locator("#title7082561269689932913_17637670920925986525")
  ).toContainText("last updated 2/28/2025");
  await page.getByLabel("MIDDLESEX, County . Press").click();
  await page
    .locator("#view7082561269689932913_1533492169941227867 canvas")
    .nth(1)
    .click({
      position: {
        x: 206,
        y: 41,
      },
    });
  await expect(
    page.locator("#view7082561269689932913_1533492169941227867 canvas").nth(1)
  ).toBeVisible();
  await page.getByLabel("ESSEX, County . Press Space").click();
  await expect(
    page.locator("#view7082561269689932913_1533492169941227867 canvas").nth(1)
  ).toBeVisible();
  await page.getByLabel("HUDSON, County . Press Space").click();
  await expect(
    page.locator("#view7082561269689932913_1533492169941227867 canvas").nth(1)
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Start" }).click();
  await page.getByText("January").click();
  await page.getByRole("textbox", { name: "Start" }).click();
  await page.getByRole("textbox", { name: "Start" }).fill("1/1/2025");
});
