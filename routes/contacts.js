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
router.put('/:id', validateUpdatedContact, updateContact)
router.get('/:id', getContact)
router.delete('/:id', deleteContact)

module.exports = router