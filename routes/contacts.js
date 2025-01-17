const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/contacts');

router.get('/', getContacts);
router.get('/getByEmail/:email', getContacts);
module.exports = router;