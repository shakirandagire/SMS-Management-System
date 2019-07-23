const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'smsdb',
    password: '',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  };
  

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('Connected to the SMS Database');
});

const contactsTable = () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS
    contacts(contact_id SERIAL PRIMARY KEY,
            name VARCHAR(128) NOT NULL,
            phone_number INT NOT NULL,
            password VARCHAR(128) NOT NULL)
            `;
        pool.query(queryText)
        .then((res) => {
        console.log(res);
        pool.end();
        })
        .catch((err) => {
        console.log(err);
        pool.end();
        });
}


const smsTable = () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS
    sms(sms_id SERIAL PRIMARY KEY,
        sender VARCHAR(128) NOT NULL,
        receiver VARCHAR(128) NOT NULL,
        message VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 'not-sent',
        contact_id INT NULL,
        FOREIGN KEY (contact_id) REFERENCES contacts (contact_id) ON UPDATE CASCADE ON DELETE CASCADE)
    `;
        pool.query(queryText)
        .then((res) => {
        console.log(res);
        pool.end();
        })
        .catch((err) => {
        console.log(err);
        pool.end();
        });
    };
      
    module.exports = {
        contactsTable,
        smsTable,
        pool,
    };
    
    require('make-runnable');