const express = require('express')
const router = express.Router()
const {
  addContact,
  deleteContact,
  getContacts,
  getContact,
  updateContact,
  validateContact,
  validateUpdatedContact
} = require('../controllers/contacts')

router.get('/', getContacts)
router.post('/', validateContact, addContact)
router.put('/:email', validateUpdatedContact, updateContact)
router.get('/:email', getContact)
router.delete('/:email', deleteContact)

module.exports = router