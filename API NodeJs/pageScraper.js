const diccionario = require('./diccionario.js')

const scraperObject = {
	url: 'http://books.toscrape.com',
	async scraper(browser, obj){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		// await page.goto(this.url);

		const src = diccionario[obj.src];
		const target = diccionario[obj.target];

		console.log(`El valor de src es: ${src}`)
		console.log(`El valor de target es: ${target}`)

		await page.goto(`https://translate.google.com.ar/?hl=es&sl=${src}&tl=${target}&op=translate`)
						//  https://translate.google.com.ar/?hl=es&sl=es&tl=en&op=translate
		//ESCRIBO LA PALABRA PARA TRADUCIRLA
		await page.type('[aria-label="Texto original"]', obj.palabra)
		await page.waitForSelector('span[class="VIiyi"]')

		// SI TIENE MAS DE UNA TRADUCCION LA GUARDO
		const traducciones = await page.evaluate(() => {
			return document.querySelectorAll('.VIiyi');
		})

		const traducido = []
    
		//Puede contener mas de una traduccion como puede ser en el caso de que sea
		//de ingles a español con la palabra cat, que devuelve dos traducciones: gato y gata
		for (const property in traducciones){
			const indTrad = traducciones[property].__incrementalDOMData.key.split("-").length - 1
			const element = traducciones[property].__incrementalDOMData.key.split("-")[indTrad]
			traducido.push(element)
		}

		// return new Promise((resolve, reject) => {
		// 	if(traducido.length > 0) {
		// 		resolve(traducido)
		// 	} else {
		// 		reject("The translate cannot ocurrs")
		// 	}
		// 	browser.close()
		// })

		if( traducido.length > 0 ) {
			return traducido
		} else {
			return "An error ocurrs"
		}
        // // Wait for the required DOM to be rendered
		// await page.waitForSelector('.page_inner');
		// // Get the link to all the required books
		// let urls = await page.$$eval('section ol > li', links => {
		// 	// Make sure the book to be scraped is in stock
		// 	links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
		// 	// Extract the links from the data
		// 	links = links.map(el => el.querySelector('h3 > a').href)
		// 	return links;
		// });
		// return obj
	}
}

module.exports = scraperObject;