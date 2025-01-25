const express = require('express')
const router = express.Router()
const { addContact, getContacts, getContact, updateContact, validateContact, validateUpdatedContact } = require('../controllers/contacts')

router.get('/', getContacts)
router.post('/', validateContact, addContact)
router.put('/:email', validateUpdatedContact, updateContact)
router.get('/:email', getContact)

module.exports = router