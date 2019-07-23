const express = require('express');
const bodyParser = require('body-parser');
const contacts = require('./controllers/contacts')
const sms = require('./controllers/sms')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the SMS Management system');
});

app.get('/contacts', contacts.getContacts)
app.get('/contacts/:id', contacts.getSingleContact)
app.delete('/contacts/:id', contacts.deleteContact)
app.patch('/contacts/:id', contacts.editContact)
app.post('/contacts', contacts.postContact)
app.post('/login', contacts.loginContact)
app.get('/sms', sms.getSMS)
app.get('/sms/:id', sms.getSingleSMS)
app.delete('/sms/:id', sms.deleteSMS)
app.post('/sms', sms.postSMS)


app.listen(port, () => {
    console.log(`We are live at 127.0.0.1:${port}`);
});