const db = require('../db');
const collection = 'contacts';

async function getContacts(req, res) {
  const contacts = await db.find({ collection });
  contacts.toArray()
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
    });
}

async function getContact(req, res) {
  const contact = await db.findOne({ collection, options: { id: req.params.id } });
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).send(`No contact found with id: ${req.params.id}`)
  }
}

module.exports = { getContacts, getContact }
