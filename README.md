# SMS-Management-System

SMS Management Application is an Node JS API that manages sending and receiving of SMS messages. With this API, you can add, edit, delete and view contacts as well as send, edit, receive and view SMSes.

# Pre-Requisites ttalledbe inso 
Ensure to have these on your machine.

- Node

- Postgres

- Postman


# Set up:
 Clone the repository.

git clone `https://github.com/shakirandagire/SMS-Management-System.git`

# Install the dependencies by running:

`npm install`

#Run the create tables commands

`npm run createContacts`

`npm run createSMS`

# Get started

`npm run dev`

You can now access the application using postman on http://localhost:3000


# Endpoints:

|EndPoint|Description|
|---------|------------|
|POST/contacts|Creates a new contact|
|POST/login|Logs in a user|
|PATCH/contacts/:id|Updates a contact|
|DELETE/contacts/:id|Deletes a contact|
|GET/contacts|Get all contacts|
|GET/contacts/:id|Gets single contact|
|POST/sms|Sends sms to a contact|
|DELETE/sms/:id	| Deletes a contact|
|GET/sms|Gets all smses|
|GET/sms/:id|Get single sms|


Datasets to use when testing in Postman
# Creating a new contact
`{
    "name": "Kyra",
    "phone_number": "0781980273",
    "password": "password"
 } `
 
# Log in user:
 `{
    "phone_number": "0781980273",
    "password": "password"
 }`

# Send SMS:
Uses the token acquired after logging into the system.
    `"status": "sent",
    "receiver": "0793456789",
    "message": "Hello",
        `
