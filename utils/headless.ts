import { chromium, devices, Page } from "playwright-chromium"

export async function executeInPage<T>(url: string, handle: (page: Page) => Promise<T>) {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  })
  const context = await browser.newContext(devices["Desktop Chrome"])
  const page = await context.newPage()

  await context.route("**/*.{png,jpg,jpeg}", (route) => route.abort())
  await page.goto(url)

  const result = await handle(page)

  await context.close()
  await browser.close()

  return result
}
