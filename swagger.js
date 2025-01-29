const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A simple API to manage contacts',
  },
  host: 'localhost:8080',
  schemes: ['http'],
}

const outputFile = './swagger.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)