const { chromium } = require('playwright');

async function seleccionarIdioma($src, $target){

}

async function traductor ($palabra) {
  const browser = await chromium.launch({ headless: false })
  
  const page = await browser.newPage()
  await page.goto('https://translate.google.com.ar/?hl=es')
  // await page.click('class=VfPpkd-YVzG2b')
  // const content = await page.textContent('[aria-label="Texto original"]')

  await page.type('[aria-label="Texto original"]', $palabra)

  

  await page.waitForSelector('span[class="VIiyi"]')
  const traducciones = await page.$$('.VIiyi') 

  const traducido = []
  
  for (let i = 0; i < traducciones.length; i++) {
    const element = await traducciones[i].innerText()
    traducido.push(element)
  }


  //Seleccion de idioma
  // barra completa class = aCQag
  // flechas individuales class = VfPpkd-Bz112c-RLmnJb   - ambas tienen la misma clase

  

  await page.click('.VfPpkd-Bz112c-RLmnJb')
                    

  // escribir el idioma seleccionado
  await page.type('[aria-label="Buscar idiomas"]')
  await page.type('[aria-label="Buscar idiomas"]')


  // clases de nombre de los idiomas Llmcnf

  await page.waitForTimeout(20000)

  // console.log("Dentro de la funcion")
  // console.log(traducido[0])
  // console.log(traducido[1])

  // console.log("Dentro de la funcion")

  // await page.waitForTimeout(2000)

  // await page.screenshot({ path: 'traductor.png' })
  // await page.
  await browser.close()
       
  return new Promise((resolve ,reject)=>{
    setTimeout(
      ()=>{
            if (traducido.length > 0){
              resolve(traducido)
            } else {
              reject(error)
            }      
        } , 20
    );
  });
}

let palabra = 'pancho'

traductor(palabra)
  .then(result => {
    for (let i = result.length-1; i >= 0; i--) {
      console.log(result[i]);
    }
  })

// console.log(traducido.length)

// for (let i = 0; i < traducido.length; i++) {
//   console.log(traducido[i])
// }