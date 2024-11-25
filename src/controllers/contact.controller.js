'use strict';

const Contact = require('../models/contact.model');

// Add a new contact
const addContact = (req, res) => {
  if (!req.body.last_name || !req.body.first_name || !req.body.email_address || !req.body.contact_no) {
    return res.status(400).send({
      message: "All fields are required"
    });
  }

  const contact = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    email_address: req.body.email_address,
    contact_no: req.body.contact_no,
    is_deleted: 0
  };

  Contact.addContact(contact, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Error adding contact"
      });
    } else {
      return res.status(201).send({
        message: "Contact added",
        data: data
      });
    }
  });
};

// Update an existing contact
const updateContact = (req, res) => {
  if (!req.body.last_name || !req.body.first_name || !req.body.email_address || !req.body.contact_no) {
    return res.status(400).send({
      message: "All fields are required"
    });
  }

  const contact = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    email_address: req.body.email_address,
    contact_no: req.body.contact_no
  };

  // Check if contact exists before updating
  Contact.getContactById(req.params.id, (err, existingContact) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving contact"
      });
    }
    if (!existingContact) {
      return res.status(404).send({
        message: "Contact not found"
      });
    }

    // Proceed with updating the contact
    Contact.updateContact(req.params.id, contact, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Error updating contact"
        });
      } else {
        return res.status(200).send({
          message: "Contact updated",
          data: data
        });
      }
    });
  });
};

// Get all contacts
const getContacts = (req, res) => {
  Contact.getContacts((err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving contacts"
      });
    } else {
      return res.status(200).send(data);
    }
  });
};

// Delete a contact (soft delete)
const deleteContact = (req, res) => {
  // Check if contact exists before deleting
  Contact.getContactById(req.params.id, (err, existingContact) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving contact"
      });
    }
    if (!existingContact) {
      return res.status(404).send({
        message: "Contact not found"
      });
    }

    // Proceed with deleting the contact
    Contact.deleteContact(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Error deleting contact"
        });
      } else {
        return res.status(200).send({
          message: "Contact deleted"
        });
      }
    });
  });
};

module.exports = { addContact, updateContact, getContacts, deleteContact };
