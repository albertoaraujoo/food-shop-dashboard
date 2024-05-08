import { expect, test } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();
});

test("paginate orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Next Page", exact: true }).click();

  expect(
    page.getByRole("cell", { name: "Customer 11", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 20", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Last Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 51", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 60", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Previous Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 41", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 50", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "First Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();
});

test("filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Order's Id").fill("order-11");

  await page.getByRole("button", { name: "Filter Results" }).click();

  expect(
    page.getByRole("cell", { name: "order-11", exact: true }),
  ).toBeVisible();
});

test("filter by custumer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Client's Name").fill("Customer 11");

  await page.getByRole("button", { name: "Filter Results" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 11", exact: true }),
  ).toBeVisible();
});

test("filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();

  await page.getByLabel("Pending").click();

  await page.getByRole("button", { name: "Filter Results" }).click();

  await expect(page.getByRole("cell", { name: "Pending" })).toHaveCount(10);
});
