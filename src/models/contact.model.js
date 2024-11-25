'use strict';

const dbConn = require('../../config/db.config');

// Create a contact
const addContact = (contact, result) => {
  dbConn.query("INSERT INTO contact_list SET ?", contact, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      console.log("Contact added: ", res);
      result(null, { id: res.insertId, ...contact });
    }
  });
};

// Update a contact
const updateContact = (id, contact, result) => {
  dbConn.query("UPDATE contact_list SET last_name = ?, first_name = ?, email_address = ?, contact_no = ? WHERE id = ?",
    [contact.last_name, contact.first_name, contact.email_address, contact.contact_no, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
      } else {
        console.log("Contact updated: ", res);
        result(null, res);
      }
    });
};

// Get all contacts
const getContacts = (result) => {
  dbConn.query("SELECT id, last_name, first_name, email_address, contact_no, is_deleted FROM contact_list WHERE is_deleted = 0", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      console.log("Contacts retrieved: ", res);
      result(null, res);
    }
  });
};

// Get a contact by ID
const getContactById = (id, result) => {
  dbConn.query("SELECT id, last_name, first_name, email_address, contact_no, is_deleted FROM contact_list WHERE id = ? AND is_deleted = 0", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      if (res.length) {
        console.log("Contact found: ", res[0]);
        result(null, res[0]); // Return the contact if found
      } else {
        console.log("Contact not found");
        result(null, null); // No contact found
      }
    }
  });
};

// Delete a contact (soft delete by updating is_deleted to 1)
const deleteContact = (id, result) => {
  dbConn.query("UPDATE contact_list SET is_deleted = 1 WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      console.log("Contact deleted: ", res);
      result(null, res);
    }
  });
};

module.exports = { addContact, updateContact, getContacts, getContactById, deleteContact };

