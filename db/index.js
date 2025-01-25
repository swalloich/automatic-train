const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.lb8p4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

let client;

function connect(customUri) {
  if (client) return client
  MongoClient.connect(customUri || uri)
    .then((connection) => {
      client = connection
    })
    .catch((err) => {
      console.error(err)
    })
}

async function insert({ collection, db, data }) {
  try {
    return await client.db(db || 'CSE341').collection(collection).insertOne(data)
  } catch (err) {
    console.error(err)
    return false
  }
}

async function find({ collection, db, params }) {
  try {
    return await client.db(db || 'CSE341').collection(collection).find({...params})
  } catch (err) {
    console.error(err)
  }
}

async function findOne({ collection, db, options }) {
  try {
    return await client.db(db || 'CSE341').collection(collection).findOne({}, options)
  } catch (err) {
    console.error(err)
  }
}

module.exports = { connect, insert, find, findOne }
