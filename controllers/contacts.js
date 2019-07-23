const { pool } = require('../services/db');
const jwt = require('jsonwebtoken');

const getContacts = (req, res) => {
    const query = 'SELECT * FROM contacts';
    pool.query(query, (error, result) => {
        if (!result.rows[0]) {
            return res.status(404).send({
                error: 'No Contacts found',
            });
        }
      if (error) {
        res.status(400).json({error})
      } else {
        res.status(200).send({
        status: 'Successful',
        message: 'Contact retrieved',
        contacts: result.rows,
        });
      } 
    });
  };
  
  const getSingleContact =  (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM contacts where contact_id=$1';
    pool.query(query, [id], (error, result) => {
        if (!result.rows[0]) {
            return res.status(404).send({
                error: 'Contact with given ID doesnot exist',
            });
        }
        if (error) {
        res.status(400).json({error})
        } else {
            res.status(200).send({
            status: 'Successful',
            message: `Contact retrieved`,
            contacts: result.rows,
            });
      } 
    });
  };
  
  const deleteContact =  (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM contacts where contact_id=$1",[id], (error, result) => {
        if (!result.rows[0]) {
              return res.status(404).send({
                  error: 'Contact with this ID doesnot exist',
              });
          } else {
            const query = 'DELETE FROM contacts where contact_id=$1';
            pool.query(query, [id], (error, result) => {
            if (error) {
                res.status(400).json({error})
            } else {
                res.status(200).send({
                message: "Contact deleted successfully",
                });
            } 
            });
        };
    });
}
  
  const editContact = (req, res) => {
    const data = {
      name : req.body.name,
      phone_number: req.body.phone_number,
      contact_id: req.params.id
    }

    pool.query("SELECT * FROM contacts where phone_number=$1 and name=$2",[data.phone_number, data.name], (error, result) => {
        if (result.rows[0]) {
              return res.status(404).send({
                  error: 'Contact with those details already exists',
              });
          } else {
  
            const queryText = 'UPDATE contacts set name= $1, phone_number = $2 where contact_id=$3';
            const values = [data.name, data.phone_number, data.contact_id];
        
            pool.query(queryText, values, (error, result) => {
            if (error) {
                console.log(error)
                res.status(400).send({
                    message: 'An error occured when saving contact'
                });
            }else{
                res.status(202).send({
                status: 'Updated contact successfully',
                });
            }
            });
        };
    });
}
  
  const postContact = (req, res) => {
      const data = {
        name : req.body.name,
        phone_number: req.body.phone_number,
        password: req.body.password
      }
      pool.query("SELECT * FROM contacts where phone_number=$1 and name=$2",[data.phone_number, data.name], (error, result) => {
      if (result.rows[0]) {
            return res.status(404).send({
                error: 'Contact with those details already exists',
            });
        } else {
      const queryText = 'INSERT INTO contacts(name, phone_number, password) VALUES ($1,$2, $3)';
      const values = [data.name, data.phone_number, data.password];
  
      pool.query(queryText, values, (error, result) => {
            if (error) {
                console.log(error)
                res.status(400).send({
                message: 'An error occured when saving contact'
            });
            }else{
            res.status(202).send({
            status: 'Added contact successfully',
            });
            }
      });
        }
    });
}
    
  
  const secret = process.env.JWT_SECRET || 'secret';
  
  const loginContact =  (req, res) => {
      const data = {
        phone_number: req.body.phone_number,
        password: req.body.password
      }
      const queryText = 'SELECT * FROM contacts where phone_number = $1 limit 1';
      pool.query(queryText, [data.phone_number], (error, result) => {
        if (!result.rows) {
            return res.status(404).send({
                error: 'Contact not found',
            });
        } if (error) {
            res.status(400).send({
              message: 'An error occured when saving contact'
          });
        } else {
          phone_number = result.rows[0]['phone_number']
          contact_id = result.rows[0]['contact_id']
          const payload = {
            phone_number,
            contact_id,
          };
          res.status(202).send({
          status: 'Logged in successfully',
          token: jwt.sign({payload}, secret, { expiresIn: 86400 }),
          });
        }
      });
    };

    module.exports = {
        getContacts,
        getSingleContact,
        deleteContact,
        editContact,
        postContact,
        loginContact
      }
  