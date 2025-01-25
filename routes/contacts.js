const express = require('express')
const router = express.Router()
const { addContact, getContacts, getContact, validateNewContact } = require('../controllers/contacts')

router.get('/', getContacts)
router.post('/', validateNewContact, addContact)
router.get('/:id', getContact)

module.exports = router