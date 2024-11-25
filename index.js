var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const contactRoutes = require('./src/routes/contact.routes');

// Use CORS and BodyParser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define root route with API documentation
app.get('/', (req, res) => {
  res.send(`
    <h1>Contact List API Documentation</h1>

    <section>
      <h2>1. Add Contact</h2>
      <p><strong>URL:</strong> <code>POST /contacts</code></p>
      <p><strong>Description:</strong> Add a new contact. Required fields: last name, first name, email, and contact number.</p>
      <p><strong>Request Body:</strong></p>
      <pre>
{
  "first_name": "John",
  "last_name": "Doe",
  "email_address": "john.doe@example.com",
  "contact_no": "1234567890"
}
      </pre>
      <p><strong>Response:</strong></p>
      <pre>
{
  "message": "Contact added",
  "data": { ...contact data... }
}
      </pre>
    </section>

    <section>
      <h2>2. Update Contact</h2>
      <p><strong>URL:</strong> <code>PUT /contacts/:id</code></p>
      <p><strong>Description:</strong> Update a contact's information by ID. Fields that can be updated: first name, last name, email address, and contact number.</p>
      <p><strong>Request Body:</strong></p>
      <pre>
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email_address": "jane.doe@example.com",
  "contact_no": "9876543210"
}
      </pre>
      <p><strong>Response:</strong></p>
      <pre>
{
  "message": "Contact updated",
  "data": { ...updated contact data... }
}
      </pre>
    </section>

    <section>
      <h2>3. Display All Contacts</h2>
      <p><strong>URL:</strong> <code>GET /contacts</code></p>
      <p><strong>Description:</strong> Get a list of all contacts.</p>
      <p><strong>Response:</strong></p>
      <pre>
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email_address": "john.doe@example.com",
    "contact_no": "1234567890",
    "is_deleted": 0
  },
  {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Doe",
    "email_address": "jane.doe@example.com",
    "contact_no": "9876543210",
    "is_deleted": 0
  }
]
      </pre>
    </section>

    <section>
      <h2>4. Delete Contact</h2>
      <p><strong>URL:</strong> <code>DELETE /contacts/:id</code></p>
      <p><strong>Description:</strong> Mark a contact as deleted by ID. This updates the <code>is_deleted</code> field to 1.</p>
      <p><strong>Response:</strong></p>
      <pre>
{
  "message": "Contact deleted"
}
      </pre>
    </section>
  `);
});

// Use contact routes
contactRoutes(app);

// Listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
