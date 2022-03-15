const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance, obj){
	let browser;
	try{
		browser = await browserInstance;
		let msje = await pageScraper.scraper(browser, obj);
		return msje
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}

}

module.exports = (browserInstance, obj) => scrapeAll(browserInstance, obj)
