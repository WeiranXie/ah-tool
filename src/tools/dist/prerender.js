"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
const blacklist_1 = require("./lib/blacklist");
const request_cache_1 = require("./lib/request-cache");
const contentful_1 = require("contentful");
const local_server_1 = require("./lib/local-server");
const logger_1 = require("./lib/logger");
const parallel_executor_1 = require("./lib/parallel-executor");
const fs_1 = require("fs");
const path_1 = require("path");
const network_idle_1 = require("./lib/network-idle");
const node_fetch_1 = __importDefault(require("node-fetch"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const yargs_1 = __importDefault(require("yargs"));
const colors_1 = require("./lib/colors");
const WRAP_OFF = '\u001b[?7l';
const WRAP_ON = '\u001b[?7h';
const renderLog = logger_1.logger('renderer');
const baseDir = path_1.resolve(__dirname, '..', '..', 'dist');
const baseUrl = new URL('/', 'https://localhost/').toString();
renderLog.info('Pre-rendering pages');
renderLog.info(`  baseDir = ${baseDir}`);
renderLog.info(`  baseUrl = ${baseUrl}`);
renderLog.info();
async function getPageSlugs() {
    const contentful = contentful_1.createClient({
        host: 'preview.contentful.com',
        space: 'a4btwfkreom2',
        accessToken: 'R-_BmYXB9-khEDHaHHv06V1vVayCkxaYgsDUegZ9P1s',
        environment: 'newdev',
    });
    const entries = await contentful.getEntries({
        content_type: 'page',
        include: 0,
    });
    const slugs = entries.items.map((item) => {
        return (item === null || item === void 0 ? void 0 : item.fields).slug;
    }).filter((slug) => {
        return slug && (typeof slug === 'string');
    });
    renderLog.info('Found', slugs.length, 'page slugs to render');
    return slugs;
}
async function getProductSlugs() {
    const response = await node_fetch_1.default('https://devapi.juitnow.com/products/v1');
    const products = await response.json();
    const slugs = products.map((product) => `dishes/${product.external_ids.contentful_slug}`);
    renderLog.info('Found', slugs.length, 'product slugs to render');
    return slugs;
}
async function main(enableConsole) {
    const localServerInterceptor = await local_server_1.createLocalServer(baseDir, baseUrl);
    const interceptors = [
        request_cache_1.cacheRequestInterceptor,
        localServerInterceptor,
        blacklist_1.blacklistInterceptor,
    ];
    async function combinedRequestInterceptor(request) {
        try {
            for (const interceptor of interceptors) {
                if (await interceptor(request))
                    return;
            }
        }
        catch (error) {
            renderLog.info('Error handling request', error);
            await request.abort('failed');
        }
    }
    const slugs = (await Promise.all([
        getPageSlugs(),
        getProductSlugs(),
    ])).flat();
    const urls = [];
    for (const locale of ['en', 'de']) {
        urls.push(new URL(`/${locale}`, baseUrl));
        for (const slug of slugs) {
            urls.push(new URL(`/${locale}/${slug}`, baseUrl));
        }
    }
    urls.sort();
    const executor = new parallel_executor_1.ParallelExecutor(5);
    const browser = await puppeteer_1.default.launch();
    const start = Date.now();
    renderLog.info('Starting rendering of', urls.length, `pages [parallelism=${executor.parallelism}]`);
    renderLog.info();
    for (const url of urls) {
        const pageLog = logger_1.logger(`renderer${colors_1.K}] [${colors_1.M}${url.pathname}`);
        executor.enqueue(async () => {
            const start = Date.now();
            pageLog.info('Starting page render');
            const page = await browser.newPage();
            try {
                await page.setCacheEnabled(true);
                await page.setRequestInterception(true);
                const idle = network_idle_1.waitForNetworkIdle(page, 1000);
                page.on('request', combinedRequestInterceptor);
                page.on('response', request_cache_1.cacheResponseInterceptor);
                let errors = 0;
                page.on('error', (error) => {
                    pageLog.error('Error rendering', error);
                    errors++;
                });
                if (enableConsole) {
                    page.on('console', (message) => {
                        const args = message.args().map((handle) => handle.jsonValue());
                        Promise.all(args).then((args) => {
                            if (args.length === 0)
                                args.push(message.text());
                            const location = message.location().url;
                            const prefix = location ?
                                `${colors_1.K}[${colors_1.W}console${colors_1.K}]${colors_1.X} ${WRAP_OFF}${location}${WRAP_ON}\n` :
                                `${colors_1.K}[${colors_1.W}console${colors_1.K}]${colors_1.X} (no location)\n`;
                            switch (message.type()) {
                                case 'error':
                                    return pageLog.error(prefix, ...args);
                                case 'warning':
                                    return pageLog.warn(prefix, ...args);
                                case 'dir':
                                case 'info':
                                case 'log':
                                    return pageLog.info(prefix, ...args);
                                case 'debug':
                                default:
                                    return pageLog.debug(prefix, ...args);
                            }
                        }).catch((error) => pageLog.error('Error in console', error));
                    });
                }
                await page.goto(url.toString());
                await idle;
                if (errors) {
                    pageLog.error('Found', errors, 'errors while rendering');
                    return false;
                }
                else if (page.url() != url.toString()) {
                    pageLog.error('Redirected to', page.url());
                    return false;
                }
                else {
                    const output = await page.content();
                    const outputDir = path_1.resolve(baseDir, `.${url.pathname}`);
                    const outputFile = path_1.resolve(outputDir, 'index.html');
                    pageLog.debug('Writing page to', outputFile);
                    await fs_1.promises.mkdir(outputDir, { recursive: true });
                    await fs_1.promises.writeFile(outputFile, output, 'utf-8');
                    pageLog.info('Page rendered in', Date.now() - start, 'ms');
                    return true;
                }
            }
            catch (error) {
                pageLog.error('Error while rendering', error);
                return false;
            }
            finally {
                await page.close();
            }
        });
    }
    const results = await executor.await();
    const errors = results.reduce((count, success) => count + (success ? 0 : 1), 0);
    await browser.close();
    if (errors) {
        renderLog.error();
        renderLog.error('Found', errors, 'errors while rendering');
        return false;
    }
    else {
        const seconds = Math.floor((Date.now() - start) / 1000);
        renderLog.info();
        renderLog.info('Successfully rendered', results.length, 'pages in', seconds, 'sec');
        return true;
    }
}
const { console: enableConsole } = yargs_1.default
    .usage('$0 [--enable-console]')
    .help('h').alias('h', 'help')
    .option('console', {
    alias: ['enable-console', 'c'],
    type: 'boolean',
    description: 'Enable browser console',
    default: false,
})
    .strict()
    .argv;
main(enableConsole)
    .then((success) => {
    process.exitCode = success ? 0 : 1;
})
    .catch((error) => {
    renderLog.error();
    renderLog.error('Error rendering', error);
    process.exitCode = 2;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ByZXJlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBRXZDLCtDQUFzRDtBQUN0RCx1REFBdUY7QUFDdkYsMkNBQXlDO0FBQ3pDLHFEQUFzRDtBQUN0RCx5Q0FBcUM7QUFDckMsK0RBQTBEO0FBRTFELDJCQUFtQztBQUNuQywrQkFBOEI7QUFDOUIscURBQXVEO0FBRXZELDREQUE4QjtBQUM5QiwwREFBa0Q7QUFDbEQsa0RBQXlCO0FBRXpCLHlDQUF5QztBQUV6QyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUE7QUFDN0IsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFBO0FBRzVCLE1BQU0sU0FBUyxHQUFHLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUdwQyxNQUFNLE9BQU8sR0FBRyxjQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFHdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7QUFHN0QsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3hDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ3hDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUloQixLQUFLLFVBQVUsWUFBWTtJQUN6QixNQUFNLFVBQVUsR0FBRyx5QkFBWSxDQUFDO1FBQzlCLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsS0FBSyxFQUFFLGNBQWM7UUFDckIsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxXQUFXLEVB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