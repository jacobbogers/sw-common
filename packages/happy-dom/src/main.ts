import { Browser, BrowserErrorCaptureEnum } from 'happy-dom';

const browser = new Browser({ settings: { errorCapture: BrowserErrorCaptureEnum.processLevel } });
const page = browser.newPage();
await page.goto('https://github.com/capricorn86/happy-dom/wiki/Getting-started');

const elt = page.mainFrame.document.querySelector(
    'a[data-hydro-click]'
) as HTMLLinkElement | null;

// page.mainFrame.window.performance.mark('navigationStart');
// console.log(page.mainFrame.document);
console.log('elt', elt?.href);
if (elt) {
    elt.click();
}
await page.waitUntilComplete();

console.log(page.mainFrame.document.title);

await browser.close();
