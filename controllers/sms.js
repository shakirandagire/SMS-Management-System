const { pool } = require('../services/db');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const postSMS = (req, res) => {
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, secret);
    phone_number = decoded.payload.phone_number;
    contact_id = decoded.payload.contact_id;
   
    pool.query("SELECT * FROM sms where receiver=$1 and message=$2",[req.body.receiver,req.body.message], (error, result) => {
        if (result.rows[0]) {
              return res.status(404).send({
                  error: 'Contact with those details already exists',
              });
          } else {
    const queryText = `INSERT INTO sms(sender, receiver, message, status, contact_id) VALUES \
                      (${phone_number},$1,$2,$3,${contact_id})`;
    const values = [req.body.receiver,req.body.message, req.body.status];
    pool.query(queryText, values, (error, result) => {
      if (error) {
          console.log(error)
          res.status(400).send({
            message: 'An error occured when saving contact'
        });
      }else{
        res.status(202).send({
        status: 'SMS sent successfully',
        });
      }
    });
};
    });
}

const getSMS = (req, res) => {
  const query = 'SELECT * FROM sms';
  pool.query(query, (error, result) => {
    if (!result.rows[0]) {
        return res.status(404).send({
            error: 'No SMS found',
        });
    }
    if (error) {
      res.status(400).json({error})
    } else {
      res.status(200).send({
      status: 'Successful',
      message: 'SMS retrieved',
      sms: result.rows,
      });
    } 
  });
};

const getSingleSMS = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM sms where sms_id=$1';
  pool.query(query, [id], (error, result) => {
    if (!result.rows[0]) {
        return res.status(404).send({
            error: 'SMS with given ID doesnot exist',
        });
    }
    if (error) {
      res.status(400).json({error})
    } else {
      res.status(200).send({
      status: 'Successful',
      message: `SMS retrieved`,
      sms: result.rows,
      });
    } 
  });
};

const deleteSMS = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM sms where sms_id=$1",[id], (error, result) => {
    if (!result.rows[0]) {
          return res.status(404).send({
              error: 'SMS with this ID doesnot exist',
          });
      } else {
  const query = 'DELETE FROM sms where sms_id=$1';
  pool.query(query, [id], (error, result) => {
    if (error) {
      res.status(400).json({error})
    } else {
      res.status(200).send({
      status: 'Successful',
      message: `SMS deleted`,
      });
    } 
  });
    };
  });
}

module.exports = {
    getSMS,
    getSingleSMS,
    deleteSMS,
    postSMS,
  }
