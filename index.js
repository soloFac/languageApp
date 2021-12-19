


const btnBuscar = document.getElementById('buscar')
let palabra = document.getElementById('gif').value

document.getElementById('gif').addEventListener('keyup', () => {
    palabra = document.getElementById('gif').value
})

btnBuscar.addEventListener('click', () => {
    apiImgUnsplash(palabra)
})

document.getElementById('gif').addEventListener('keyup', function (event) {
    // Number 13 is the 'Enter' key on the keyboard
    // console.log(event.keyCode)
    // console.log(clase)

    console.log(document.getElementById('gif').value)
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
                img.className = 'gif'

                document.getElementById('app').appendChild(img)
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
                img.className = 'gif'

                document.getElementById('app').appendChild(img)
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
            const gifs = results.map(image => image.urls.thumb)
            console.log(gifs)

            let cont = 0
            gifs.forEach(url => {
                if (cont === 0) {
                    console.log(url)
                }
                cont += 1
                const img = document.createElement('img')
                img.src = url
                img.className = 'gif'

                document.getElementById('app').appendChild(img)
            })
        })
}







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



