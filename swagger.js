const swaggerAutogen = require('swagger-autogen')()

const basicContactShape = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    favoriteColor: { type: 'string' },
    birthday: { type: 'string', format: 'date-time' }
  }
}

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A simple API to manage contacts',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  definitions: {
    NewContact: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'john.doe@example.com',
      $favoriteColor: 'blue',
      $birthday: '1990-01-01T00:00:00+00:00',
    },
    UpdatedContact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'blue',
      birthday: '1990-01-01T00:00:00+00:00',
    },
  },
}

const outputFile = './swagger.json'
const routes = ['./index.js']

swaggerAutogen(outputFile, routes, doc)