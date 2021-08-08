const Apify = require('apify');
const fs = require('fs');

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: 'https://dothi.net/nha-dat-ban/p5.htm\'' });

    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        handlePageFunction: async ({ request, page}) => {
            const title = await page.title();
            console.log(`Title of ${request.url}: ${title}`);

            const {body} = await Apify.utils.requestAsBrowser(request);
            // const dataset = await Apify.openDataset('my-results');
            fs.writeFile("HTM/p5.htm", body, 'utf8' ,(err) => {
                   if (err) throw err;
            });
            }

    });

    await crawler.run();
});
// Prepare a list of URLs to crawl
// Prepare a list of URLs to crawl
// let proxy = '172.16.1.11:3128';
//
// Apify.main(async () => {
//     const requestList = new Apify.RequestList({
//         sources: [{url: 'https://dothi.net/nha-dat-ban/p*.htm'}],
//     });
//
//
//     await requestList.initialize();
//
// // Crawl the URLs
//     const crawler = new Apify.BasicCrawler({
//
//         requestList,
//         handleRequestFunction: async ({request }) => {
//             // 'request' contains an instance of the Request class
//             // Here we simply fetch the HTML of the page and store it to a dataset
//             // const usedProxyUrl = proxyInfo.url;
//             const {body} = await Apify.utils.requestAsBrowser(request);
//             // const dataset = await Apify.openDataset('my-results');
//             fs.writeFile("HTM/p3.htm", body, 'utf8' ,(err) => {
//                 // throws an error, you could also catch it here
//                 if (err) throw err;
//             });
//         },
//     });
//
//     await crawler.run();
// });
