import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByLabel("Email").fill("johndoe@email.com");
  await page.getByRole("button", { name: "Access Dashboard" }).click();

  const toast = page.getByText(
    "We've sent an authentication link to your email.",
  );

  expect(toast).toBeVisible();
});

test("sign with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByLabel("Email").fill("wrong@email.com");
  await page.getByRole("button", { name: "Access Dashboard" }).click();

  const toast = page.getByText("Invalid credentials.");

  expect(toast).toBeVisible();
});

test("navigate to new business page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "New Business" }).click();

  expect(page.url()).toContain("/sign-up");
});
