let palabra = document.getElementById('palabra').value
let btnBuscar = document.getElementById('buscar')

//RECUPERO EL ULTIMO VALOR ESCRITO DE LA PALABRA EN EL INPUT
document.getElementById('palabra').addEventListener('keyup', () => {
    palabra = document.getElementById('palabra').value
})

//CUANDO SE EJECUTE EL BOTON BUSCAR VOY A DEVOLVER LA IMAGEN
btnBuscar.addEventListener('click', () => {
    //1° traduzco la palabra para buscar en unsplash
    // traductor(palabra)
    //     .then(result => {
    //         for (let i = result.length-1; i >= 0; i--) {
    //             console.log(result[i]);
    //         }
    //         // setTimeout(function(){
    //         //   console.log("I am the third log after 5 seconds");
    //         // },30000);
    //     })
    apiImgUnsplash(palabra)
})

document.getElementById('palabra').addEventListener('keyup', function (event) {
    // Number 13 is the 'Enter' key on the keyboard
    // console.log(event.keyCode)
    // console.log(clase)

    console.log(document.getElementById('palabra').value)
    if (event.code === 'Enter') {
        // elimino los gifs anteriores
        const clases = document.querySelectorAll('.gif')
        clases.forEach(clase => {
            clase.remove()
        })
        // Cancel the default action, if needed
        event.preventDefault()
        // Trigger the button element with a click
        btnBuscar.click()
    }
    // apiGif(inputPalabra.value)
})

function apiGif (keyWord) {
    const apiKey = '8UW6VLuGXKEIcbwi7yDGkoFAk07ACNJe'
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyWord}&limit=10&offset=0&rating=r&lang=en`

    // eslint-disable-next-line no-undef
    fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const { data } = response
            const gifs = data.map(image => image.images.downsized_medium.url)
            console.log(gifs)

            let cont = 0
            gifs.forEach(url => {
                if (cont === 0) {
                    console.log(url)
                }
                cont += 1
                const img = document.createElement('img')
                img.src = url
                img.className = 'palabra'

                document.getElementById('imagenes').appendChild(img)
            })
        })
}

function apiImg (keyWord) {
    const apiKey = '24838893-cb7dd9be96dadc6f3280fae6e'
    const apiURL = `https://pixabay.com/api/?key=24838893-${apiKey}&q=${keyWord}&image_type=photo&pretty=false`

    fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const { hits } = response
            const gifs = hits.map(image => image.largeImageURL)
            console.log(gifs)

            let cont = 0
            gifs.forEach(url => {
                if (cont === 0) {
                    console.log(url)
                }
                cont += 1
                const img = document.createElement('img')
                img.src = url
                img.className = 'palabra'

                document.getElementById('imagenes').appendChild(img)
            })
        })
}

function apiImgUnsplash (keyWord) {
    // const apiKey = 'W-RlkC7fFUAOewzX0nU30BWvuzOHNLdX2Fx91ozKxk8'
    const apiURL = `https://api.unsplash.com/search/photos?query=${keyWord}&per_page=20&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`

    fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const { results } = response
            const gifs = results.map(image => image.urls.regular)
            console.log(gifs)

            //Elimino los resultados anteriores
            const clases = document.querySelectorAll('.img')
            clases.forEach(clase => {
                clase.remove()
            })

            //Cambio el valor de la traduccion
            const traduccion = document.getElementById("traduccion")
            traduccion.textContent = keyWord


            let cont = 1
            gifs.forEach(url => {
                //Solo quiero recuperar 3 imagenes
                if (cont <= 3) {
                    var img = document.createElement('img')
                    img.src = url
                    img.className = 'img'
                }
                cont += 1
                document.getElementById('imagenes').appendChild(img)
            })
        })
}




