const Apify = require('apify');
const fs = require('fs');
// const remoteDataset = await Apify.openDataset('my-remote-data', { forceCloud: true });
// Apify.main(async () => {
//     const requestQueue = await Apify.openRequestQueue();
//     await requestQueue.addRequest({ url: 'https://www.facebook.com/' });
//
//     const crawler = new Apify.PuppeteerCrawler({
//         requestQueue,
//         handlePageFunction: async ({ request, page}) => {
//             const title = await page.title();
//             console.log(`Title of ${request.url}: ${title}`);
//             await Apify.utils.enqueueLinks({
//                requestQueue,
//                page,
//                pseudoUrls: ['https://www.facebook.com/'],
//             });
//         },
//     });
//
//     await crawler.run();
// });
// Prepare a list of URLs to crawl
// Prepare a list of URLs to crawl
Apify.main(async () => {
    const requestList = new Apify.RequestList({
        sources: [{url: 'https://dothi.net/nha-dat-ban/p2.htm'}],
    });
    await requestList.initialize();

// Crawl the URLs
    const crawler = new Apify.BasicCrawler({
        requestList,
        handleRequestFunction: async ({request}) => {
            // 'request' contains an instance of the Request class
            // Here we simply fetch the HTML of the page and store it to a dataset
            const {body} = await Apify.utils.requestAsBrowser(request);
            const dataset = await Apify.openDataset('my-results');
            fs.writeFile("p2.htm", body, 'utf8' ,(err) => {
                // throws an error, you could also catch it here
                if (err) throw err;
            });
            // await dataset.pushData({
            //     url: request.url,
            //     html: body,
            // });
        },
    });

    await crawler.run();
});
