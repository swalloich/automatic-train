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

module.exports = { getContacts };