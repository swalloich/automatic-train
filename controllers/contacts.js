const { body, validationResult } = require('express-validator')
const db = require('../db')
const collection = 'contacts'

const validateNewContact = [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail().notEmpty(),
  body('favoriteColor').isString().notEmpty(),
  body('birthday').isISO8601().notEmpty(),
];

async function addContact(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  await db.insert({ collection, data: req.body })
    .then(({ insertedId }) => {
      res.status(201).send({ id: insertedId })
    })
    .catch(() => {
      res.status(500).send("Internal Server Error")
    });
}

async function getContacts(_, res) {
  const contacts = await db.find({ collection })
  contacts.toArray()
    .then((contacts) => {
      res.status(200).json(contacts)
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
    });
}

async function getContact(req, res) {
  const contact = await db.findOne({ collection, options: { id: req.params.id } })
  if (contact) {
    res.status(200).json(contact)
  } else {
    res.status(404).send(`No contact found with id: ${req.params.id}`)
  }
}

module.exports = { addContact, getContacts, getContact, validateNewContact }
