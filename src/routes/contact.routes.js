'use strict';

module.exports = (app) => {
  const contactController = require('../controllers/contact.controller');

  // Add a new contact
  app.post('/contacts', contactController.addContact);

  // Update an existing contact
  app.put('/contacts/:id', contactController.updateContact);

  // Get all contacts
  app.get('/contacts', contactController.getContacts);

  // Delete a contact (soft delete)
  app.delete('/contacts/:id', contactController.deleteContact);
};
