'use strict';

import express from 'express';
const router = express.Router();

import Tylers from '../models/tylers.js';

/**
 * Simple method to send a JSON response (all of the API methods will use this)
 * @param res
 * @param data
 */
let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let sendJSON204 = (res, data) => {
  res.statusCode = 204;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

/**
 * Send a formatted (JSON) error the user in case of catastrophe
 * @param res
 * @param err
 */
let serverError = (res,err) => {
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

router.get('/api/v1/tylers', (req,res) => {
  Tylers.fetchAll()
    .then( data => sendJSON(res,data) )
    .catch( err => serverError(res,err) );
});

// Note the split of the fetchAll and fetchOne type of routes
// into one that takes an id route param and one that does not
router.get('/api/v1/tylers/:id', (req,res) => {
  if ( req.params.id ) {
    Tylers.findOne(req.params.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  }
  else {
    serverError(res, 'Record Not Found');
  }

});

router.post('/api/v1/tylers', (req,res) => {
  let record = new Tylers(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);

});

router.delete('api/v1/tylers/:id', (req,res) => {
  console.log(req.params.id);
  if(req.params.id) {
    let id = req.params.id;
    Tylers.deleteOne(id)
      .then(data => sendJSON204(res, data))
      .catch(err => {
        console.log('router.delete', err);
        serverError(res, err);
      });
  } else {
    serverError(res, 'Record Not Found');
  }
});

export default router;
