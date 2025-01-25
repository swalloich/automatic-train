const { body, validationResult } = require('express-validator')
const db = require('../db');
const { ObjectId } = require('mongodb');
const collection = 'contacts'

const validateContact = [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail().notEmpty(),
  body('favoriteColor').isString().notEmpty(),
  body('birthday').isISO8601().notEmpty(),
];

const validateUpdatedContact = [
  body('firstName').optional().isString().notEmpty(),
  body('lastName').optional().isString().notEmpty(),
  body('email').optional().isEmail().notEmpty(),
  body('favoriteColor').optional().isString().notEmpty(),
  body('birthday').optional().isISO8601().notEmpty(),
]

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

async function deleteContact(req, res) {
  const id = ObjectId.createFromHexString(req.params.id)
  await db.deleteOne({ collection, filter: { _id: id } })
    .then((response) => {
      if (response.deletedCount === 0) {
        return res.status(404).send(`No contact found with email: ${req.params.email}`)
      }
      res.status(200).send()
    })
    .catch(() => {
      res.status(500).send("Internal Server Error")
    });
}

async function updateContact(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const id = ObjectId.createFromHexString(req.params.id)
  await db.update({ collection, data: req.body, filter: { _id: id } })
    .then((response) => {
      if (response.matchedCount === 0) {
        return res.status(404).send(`No contact found with id: ${req.params.id}`)
      } else if (response.modifiedCount === 0) {
        return res.status(304).send("Contact not modified")
      }
      res.status(204).send()
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
  const id = ObjectId.createFromHexString(req.params.id)
  await db.findOne({ collection, query: { _id: id } })
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact)
      } else {
        res.status(404).send(`No contact found with id: ${req.params.id}`)
      }
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
    })
}

module.exports = { addContact, deleteContact, getContacts, getContact, updateContact, validateContact, validateUpdatedContact }
