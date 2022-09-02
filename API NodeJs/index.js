const { response } = require('express')
const express = require('express')

const cors = require('cors')
const app = express()

// puppeteer
const browserObject = require('./browser')
const scraperController = require('./pageController')

async function index(obj){
    //Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser()
    
    // Pass the browser instance to the scraper controller
    let msje = await scraperController(browserInstance, obj)
    return msje
}

// {
//   palabra: "gato",
//   src: "Español",
//   target: "Inglés"
// }


app.use(cors())
app.use(express.json())
// commonJs
// const http = require('http')
// EmaScript Modules
// import http from 'http'

// los scripts del package json van a mirar a la carpeta de binarios de node_modules,

let notes = [
    {
      id: 1,
      content: 'Me tengo que suscribir a @midudev en YouTube',
      date: '2019-05-30T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Tengo que estudiar las clases del FullStack Bootcamp',
      date: '2019-05-30T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'Repasar los retos de JS de midudev',
      date: '2019-05-30T19:20:14.298Z',
      important: true
    }
  ]

// const app = http.createServer((requiest, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// app.use( async (request, response) => {
//   const obj = await index({
//       palabra: "cerveza",
//       src: "Español",
//       target: "Inglés"
//   });
//   response.json(obj)
// })

app.get('/traducir/:palabra', async (request, response) => {
  const obj = await index({
    palabra: request.params.palabra,
    src: "Español",
    target: "Inglés"
  });
  response.json(obj)
})


// app.get('/', (request, response) => {
//   response.send('<h1>Hello World</h1>')
// })


// app.get('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)

//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404)
//   }
// })

// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)
//   response.status(204).end()
// })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})