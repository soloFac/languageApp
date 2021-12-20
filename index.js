const { firefox } = require('playwright');






async function escribirPalabra({ page }, palabra){
    await page.type('[aria-label="Texto original"]', palabra)
    await page.waitForSelector('span[class="VIiyi"]')
}

async function traductor(palabra, src, target) {
    const browser = await firefox.launch({ headless: false })
    const page = await browser.newPage()

    src = diccionario[src];
    target = diccionario[target];

    console.log(`El valor de src es: ${src}`)
    console.log(`El valor de target es: ${target}`)

    await page.goto(`https://translate.google.com.ar/?hl=es&sl=${src}&tl=${target}&op=translate`)
    // await page.click('class=VfPpkd-YVzG2b')
    // const content = await page.textContent('[aria-label="Texto original"]')
    escribirPalabra({browser, page}, palabra);
    
    // console.log("hola1")
    // await page.click('.J0lOec')
    // await page.textContent('[class=".VIiyi"]')
    await page.waitForTimeout(2000)
    
    // console.log("hola2")
    const traducciones = await page.evaluate(() => {
        return document.querySelectorAll('.VIiyi');
    })
    // console.log(traducciones[0].__incrementalDOMData.key.split("-")[traducciones[0].__incrementalDOMData.key.split("-").length-1])
    
    const traducido = []
    
    for (const property in traducciones){
        const indTrad = traducciones[property].__incrementalDOMData.key.split("-").length - 1
        const element = traducciones[property].__incrementalDOMData.key.split("-")[indTrad]
        traducido.push(element)
    }

    // for (let i = 0; i < traducciones.length; i++) {
    //     // const element = await traducciones[i].innerText()
    // }
    
    // await page.waitForTimeout(2000000)
    
    // const ejemplo = await page.evaluate(() => {
    //     return document.querySelector(".gb_Zd").innerHTML
    // })
    // console.log(`Palabra de ejemplo: ${ejemplo}`)
    
    
    // await page.waitForSelector('[class="VIiyi"]')
    // //Puede contener mas de una traduccion como puede ser en el caso de que sea
    // //de ingles a español con la palabra gato
    // let traducciones = (await (await page.$('[class="VIiyi"]')).innerText())




    // await page.waitForTimeout(200000)
    
    // await page.waitForTimeout(2000000)

    await browser.close()

    //   const btnBuscar = page.evaluate(() => {
    //     document.getElementById('buscar');
    //     console.log(document.getElementById('buscar'))
    //   })  

    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                if (traducido.length > 0) {
                    resolve(traducido)
                } else {
                    reject("an error ocurrs")
                }
            }, 200
        );
    });
}


traductor("gato", "Español", "Inglés")
    .then(result => {
        for (let i = result.length - 1; i >= 0; i--) {

            console.log(result[i]);
        }
        // setTimeout(function(){
        //   console.log("I am the third log after 5 seconds");
        // },30000);
    })
    .catch(error => console.error(error));



/* ----------------------------------------------------------------------------------------------- */





// let palabra = document.getElementById('palabra').value

// document.getElementById('palabra').addEventListener('keyup', () => {
//     palabra = document.getElementById('palabra').value
// })

// btnBuscar.addEventListener('click', () => {
//     //1° traduzco la palabra para buscar en unsplash
//     traductor("perro")
//         .then(result => {
//             for (let i = result.length-1; i >= 0; i--) {
//             console.log(result[i]);
//             }
//             // setTimeout(function(){
//             //   console.log("I am the third log after 5 seconds");
//             // },30000);
//         })


//     // palabra =


//     apiImgUnsplash(palabra)
// })

// document.getElementById('palabra').addEventListener('keyup', function (event) {
//     // Number 13 is the 'Enter' key on the keyboard
//     // console.log(event.keyCode)
//     // console.log(clase)

//     console.log(document.getElementById('palabra').value)
//     if (event.code === 'Enter') {
//         // elimino los gifs anteriores
//         const clases = document.querySelectorAll('.gif')
//         clases.forEach(clase => {
//             clase.remove()
//         })
//         // Cancel the default action, if needed
//         event.preventDefault()
//         // Trigger the button element with a click
//         btnBuscar.click()
//     }
//     // apiGif(inputPalabra.value)
// })

// function apiGif (keyWord) {
//     const apiKey = '8UW6VLuGXKEIcbwi7yDGkoFAk07ACNJe'
//     const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyWord}&limit=10&offset=0&rating=r&lang=en`

//     // eslint-disable-next-line no-undef
//     fetch(apiURL)
//         .then(res => res.json())
//         .then(response => {
//             const { data } = response
//             const gifs = data.map(image => image.images.downsized_medium.url)
//             console.log(gifs)

//             let cont = 0
//             gifs.forEach(url => {
//                 if (cont === 0) {
//                     console.log(url)
//                 }
//                 cont += 1
//                 const img = document.createElement('img')
//                 img.src = url
//                 img.className = 'palabra'

//                 document.getElementById('imagenes').appendChild(img)
//             })
//         })
// }

// function apiImg (keyWord) {
//     const apiKey = '24838893-cb7dd9be96dadc6f3280fae6e'
//     const apiURL = `https://pixabay.com/api/?key=24838893-${apiKey}&q=${keyWord}&image_type=photo&pretty=false`

//     fetch(apiURL)
//         .then(res => res.json())
//         .then(response => {
//             const { hits } = response
//             const gifs = hits.map(image => image.largeImageURL)
//             console.log(gifs)

//             let cont = 0
//             gifs.forEach(url => {
//                 if (cont === 0) {
//                     console.log(url)
//                 }
//                 cont += 1
//                 const img = document.createElement('img')
//                 img.src = url
//                 img.className = 'palabra'

//                 document.getElementById('imagenes').appendChild(img)
//             })
//         })
// }

// function apiImgUnsplash (keyWord) {
//     // const apiKey = 'W-RlkC7fFUAOewzX0nU30BWvuzOHNLdX2Fx91ozKxk8'
//     const apiURL = `https://api.unsplash.com/search/photos?query=${keyWord}&per_page=20&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`

//     fetch(apiURL)
//         .then(res => res.json())
//         .then(response => {
//             const { results } = response
//             const gifs = results.map(image => image.urls.regular)
//             console.log(gifs)

//             //Elimino los resultados anteriores
//             const clases = document.querySelectorAll('.img')
//             clases.forEach(clase => {
//                 clase.remove()
//             })

//             //Cambio el valor de la traduccion
//             const traduccion = document.getElementById("traduccion")
//             traduccion.textContent = keyWord


//             let cont = 1
//             gifs.forEach(url => {
//                 //Solo quiero recuperar 3 imagenes
//                 if (cont <= 3) {
//                     var img = document.createElement('img')
//                     img.src = url
//                     img.className = 'img'
//                 }
//                 cont += 1
//                 document.getElementById('imagenes').appendChild(img)
//             })
//         })
// }







// window.addEventListener('load', loadImg)

// function loadImg () {
//     const url = 'https://api.unsplash.com/search/photos?query=coffee&per_page=20&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k'
//     const imageDiv = document.querySelector('.image')
//     fetch(url)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             for (let i = 0; i < data.results.length; i++) {
//                 /* Fetch only image that you want by using id. Example : https://unsplash.com/photos/6VhPY27jdps, id = '6VhPY27jdps'   */
//                 if (data.results[i].id === '6VhPY27jdps') {
//                     const imageElement = document.createElement('img')
//                     imageElement.src = data.results[i].urls.thumb
//                     imageDiv.append(imageElement)
//                 }
//             }
//         })
// }


// traductor(palabra)
//     .then(result => {
//         for (let i = result.length-1; i >= 0; i--) {
//             console.log(result[i]);
//         }
//     })


var diccionario = {
    "Afar": "aa",
    "Abjaso": "ab",
    "Achenés": "ace",
    "Acholi": "ach",
    "Adangme": "ada",
    "Afrikáans": "af",
    "Afrihili": "afh",
    "Acano": "aka",
    "Acadio": "akk",
    "Aleutiano": "ale",
    "Amárico": "am",
    "Aragonés": "an",
    "Inglés antiguo": "ang",
    "Árabe": "ar",
    "Arameo": "arc",
    "Árabe najdi": "ars",
    "Mapuche": "arn",
    "Arapaho": "arp",
    "Artificial": "art",
    "Arawak": "arw",
    "Asamés": "as",
    "Asturiano": "ast",
    "Avar": "ava",
    "Avéstico": "ave",
    "Awadhi": "awa",
    "Aimara": "ay",
    "Azerí": "az",
    "Baskir": "ba",
    "Baluchi": "bal",
    "Bambara": "bam",
    "Balinés": "ban",
    "Basa": "bas",
    "Bielorruso": "be",
    "Beya": "bej",
    "Bemba": "bem",
    "Búlgaro": "bg",
    "Bihari": "bh",
    "Bhojpuri": "bho",
    "Bislama": "bi",
    "Bicolano": "bik",
    "Edo": "bin",
    "Pie negro": "bla",
    "Bengalí": "bn",
    "Tibetano": "bo",
    "Bretón": "br",
    "Brijbhasha": "bra",
    "Bosnio": "bs",
    "Buriato": "bua",
    "Buguinés": "bug",
    "Catalán": "ca",
    "Caddo": "cad",
    "Taíno": "car",
    "Cebuano": "ceb",
    "Chamorro": "ch",
    "Chamorro": "cha",
    "Chibcha": "chb",
    "Checheno": "che",
    "Chagatay": "chg",
    "Mari": "chm",
    "Mandarín": "cmn",
    "Choctaw": "cho",
    "Cheroqui": "chr",
    "Eslavo eclesiástico antiguo": "chu",
    "Chuvasio": "chv",
    "Cheyene": "chy",
    "Corso": "co",
    "Cree": "cr",
    "Copto": "cop",
    "Córnico": "cor",
    "Tártaro de Crimea": "crh",
    "Cree": "cre",
    "Checo": "cs",
    "Casubio": "csb",
    "Galés": "cy",
    "Danés": "da",
    "Dakota": "dak",
    "Alemán": "de",
    "Delaware": "del",
    "Dinka": "din",
    "Diriku": "diu",
    "Dhivehi": "div",
    "Dogri": "doi",
    "Duala": "dua",
    "Neerlandés medio": "dum",
    "Diula": "dyu",
    "Dzongkha": "dz",
    "Efik": "efi",
    "Egipcio antiguo": "egy",
    "Acayo": "eka",
    "Griego": "el",
    "Elamita": "elx",
    "Inglés": "en",
    "Inglés medio": "enm",
    "Esperanto": "eo",
    "Español": "es",
    "Lengua de señas de Estonia": "eso",
    "Estonio": "et",
    "Euskera": "eu",
    "Ewe": "ewe",
    "Ewondo": "ewo",
    "Persa": "fa",
    "Fang": "fan",
    "Fante": "fat",
    "Finés": "fi",
    "Fiyiano": "fj",
    "Feroés": "fo",
    "Francés": "fr",
    "Francés medio": "frm",
    "Francés antiguo": "fro",
    "Fula": "ful",
    "Friulano": "fur",
    "Frisón": "fy",
    "Irlandés": "ga",
    "Ga": "gaa",
    "Gayo": "gay",
    "Gaélico escocés": "gd",
    "Yehén": "gez",
    "Kiribasiano": "gil",
    "Gallego": "gl",
    "Alemán medio": "gmh",
    "Guaraní": "gn",
    "Alemán antiguo": "goh",
    "Gondi": "gon",
    "Gótico": "got",
    "Grebo": "grb",
    "Griego antiguo": "grc",
    "Guyaratí": "gu",
    "Manés": "gv",
    "Hausa": "ha",
    "Haida": "hai",
    "Hawaiano": "haw",
    "Hebreo": "he",
    "Herero": "her",
    "Hindi": "hi",
    "Hiligainón": "hil",
    "Hiri motu": "hmo",
    "Croata": "hr",
    "Húngaro": "hu",
    "Hupa": "hup",
    "Armenio": "hy",
    "Interlingua": "ia",
    "Dayaco": "iba",
    "Plantilla:ibo": "ibo",
    "Indonesio": "id",
    "Occidental": "ie",
    "Lolo de Sichuán": "ii",
    "Inupiaq": "ik",
    "Ilocano": "ilo",
    "Ido": "io",
    "Islandés": "is",
    "Italiano": "it",
    "Inuktitut": "iu",
    "Japonés": "ja",
    "Judeopersa": "jpr",
    "Judeoárabe": "jrb",
    "Javanés": "jv",
    "Georgiano": "ka",
    "Karakalpako": "kaa",
    "Cabil": "kab",
    "Kachín": "kac",
    "Kikamba": "kam",
    "Plantilla:kau": "kau",
    "Cavi": "kaw",
    "Jasí": "kha",
    "Jotanés": "kho",
    "Plantilla:kik": "kik",
    "Kazajo": "kk",
    "Groenlandés": "kl",
    "Camboyano": "km",
    "Kannada": "kn",
    "Coreano": "ko",
    "Konkani": "kok",
    "Plantilla:kom": "kom",
    "Plantilla:kon": "kon",
    "Kosraeano": "kos",
    "Kpelle": "kpe",
    "Curuj": "kru",
    "Cachemiro": "ks",
    "Kurdo": "ku",
    "Plantilla:kua": "kua",
    "Kumyko": "kum",
    "Kusaal": "kus",
    "Kutenai": "kut",
    "Komi": "kv",
    "Córnico": "kw",
    "Kirguís": "ky",
    "Latín": "la",
    "Judeoespañol": "lad",
    "Landi": "lah",
    "Lamba": "lam",
    "Luxemburgués": "lb",
    "Lesguiano": "lez",
    "Limburgués": "li",
    "Lingala": "ln",
    "Lao": "lo",
    "Lituano": "lt",
    "Letón": "lv",
    "Moksha": "mdf",
    "Maorí": "mi",
    "Macedonio": "mk",
    "Malayalam": "ml",
    "Mongol": "mn",
    "Manchú": "mnc",
    "Moldavo": "mo",
    "Maratí": "mr",
    "Malayo": "ms",
    "Maltés": "mt",
    "Birmano": "my",
    "Erzya": "myv",
    "Nauruano": "na",
    "Náhuatl (realmente es de ISO 639-2 pero la fundación Wikimedia lo usa)": "nah",
    "Napolitano": "nap",
    "Plantilla:nav": "nav",
    "Noruego bokmål": "nb",
    "Nepalés": "ne",
    "Sindebele": "nd",
    "Bajo alemán": "nds",
    "Bajo sajón neerlandés": "nds",
    "Ndonga": "ng",
    "Neerlandés": "nl",
    "Noruego nynorsk": "nn",
    "Noruego bokmål": "no",
    "Nrebele": "nr",
    "Navajo": "nv",
    "Chewa": "ny",
    "Occitano": "oc",
    "Ojibwe": "oj",
    "Oromo": "om",
    "Oriya": "or",
    "Oseta": "os",
    "Papiamento": "pap",
    "Pali": "pi",
    "Polaco": "pl",
    "Pastún": "ps",
    "Portugués": "pt",
    "Quechua": "qu",
    "Rapa nui": "rap",
    "Kirundi": "rn",
    "Rumano": "ro",
    "Ruso": "ru",
    "Ruandés": "rw",
    "Sánscrito": "sa",
    "Sardo": "sc",
    "Escocés": "sco",
    "Sindhi": "sd",
    "Cingalés": "si",
    "Sami septentrional": "se",
    "Eslovaco": "sk",
    "Esloveno": "sl",
    "Samoano": "sm",
    "Sami inari": "smn",
    "Shona": "sn",
    "Somalí": "so",
    "Albanés": "sq",
    "Serbio": "sr",
    "Swazi": "ss",
    "Sundanés": "su",
    "Sueco": "sv",
    "Swahili": "sw",
    "Tamil": "ta",
    "Telugú": "te",
    "Tayiko": "tg",
    "Tailandés": "th",
    "Tigriña": "ti",
    "Turcomano": "tk",
    "Tagalo": "tl",
    "Klingon": "tlh",
    "Setsuana": "tn",
    "Tongano": "to",
    "Tok pisin": "tpi",
    "Turco": "tr",
    "Xitsonga": "ts",
    "Tártaro": "tt",
    "Twi": "tw",
    "Udmurto": "udm",
    "Uigur": "ug",
    "Ucraniano": "uk",
    "Urdu": "ur",
    "Uzbeco": "uz",
    "Luvenda": "ve",
    "Vietnamita": "vi",
    "Volapuk": "vo",
    "Votio": "vot",
    "Valón": "wa",
    "Wolof": "wo",
    "Xhosa": "xh",
    "Yídish": "yi",
    "Yoruba": "yo",
    "Maya yucateco": "yua",
    "Cantonés": "yue",
    "Chuan": "za",
    "Mandarín": "zh",
    "Zulú": "zu"
}


async function seleccionarIdioma({ page }, src, target) {
    // const primerIdioma = await page.waitForSelector('div[class="VfPpkd-Bz112c-RLmnJb"]')
    // console.log(primerIdioma)

    // await page.waitForTimeout(2000000)

    const flechaSeleccionIdioma = await page.$$(".zQ0atf")
    
    //SELECCIONO EL IDIOMA DE SRC
    await flechaSeleccionIdioma[0].click()
    await page.waitForTimeout(1000)
    //ESPERO QUE SE CARGE EL INPUT PARA ESCRIBIR
    const inputSelectIdioma = await page.waitForSelector('[placeholder="Buscar idiomas"]')
    await inputSelectIdioma.type(src)
    await page.waitForTimeout(500)
    // //ESPERO QUE SE CARGUE EL IDIOMA EN LA LISTA DESPLEGABLE PARA SELECCIONARLO
    const selectorIdiomaSrc = await page.waitForSelector('[class="hBxMjb"]')
    selectorIdiomaSrc.click()
    await page.waitForTimeout(1000)

    

    console.log(diccionario.Inglés)
    await flechaSeleccionIdioma[1].click()    
    await page.waitForTimeout(1000)

    // await page.waitForTimeout(2000)
    // listaIdiomas = await page.textContent('div[class="qSb8Pe"]')
    await page.waitForSelector('[class="Llmcnf"]')
    idioma = await page.click('div :text("italiano")')
    // await listaIdiomas.includes("Inglés").click()
    
    // listaIdiomas.forEach(element => {
    //     if(element.includes("Inglés")){
    //         console.log(element)
    //     }
    // });

    // await page.click('article:has-text("Playwright")');
    // //SELECCIONO EL IDIOMA DE TARGET
    //ESPERO QUE SE CARGE EL INPUT PARA ESCRIBIR
    // inputSelectIdioma = await page.waitForSelector('[aria-label="Buscar idiomas"]')
    // await inputSelectIdioma.type("ingl")
    // await page.waitForTimeout(500)
    // //ESPERO QUE SE CARGUE EL IDIOMA EN LA LISTA DESPLEGABLE PARA SELECCIONARLO
    // const selectorIdiomaTarget = await page.waitForSelector('[class="hBxMjb"]')
    // selectorIdiomaTarget.click()
    await page.waitForTimeout(500)


    // const ejemplo = await page.evaluate(() => {
    //     return "probando"
    // })
    // console.log(`Palabra de ejemplo: ${ejemplo}`)
    
    // console.log(`Palabra Ejemplo: ${ejemplo}`)
}