import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Business Name").fill("Pizza Shop");

  await page.getByLabel("Your Name").fill("John Doe");

  await page.getByLabel("Email").fill("johndoe@example.com");

  await page.getByLabel("Phone Number").fill("04985784857");

  await page.getByRole("button", { name: "Complete registration" }).click();

  const toast = page.getByText("Restaurant successfully registered.");

  expect(toast).toBeVisible();
});

test("sign up with with error", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Business Name").fill("Invalid Name");

  await page.getByLabel("Your Name").fill("John Doe");

  await page.getByLabel("Email").fill("johndoe@example.com");

  await page.getByLabel("Phone Number").fill("04985784857");

  await page.getByRole("button", { name: "Complete registration" }).click();

  const toast = page.getByText("Error when registering restaurant.");

  expect(toast).toBeVisible();
});

test("navigate to new login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Sign In" }).click();

  expect(page.url()).toContain("/sign-in");
});
