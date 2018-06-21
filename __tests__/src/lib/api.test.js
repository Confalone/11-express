'use strict';

const superagent = require('superagent');
// const api = require('../../../src/api/api.js');
// const app = require('../../../src/app.js');

const apiURL = 'http://localhost:3000/api/v1/Tylers';

describe('/api/v1/Tylers', () => {

  // beforeAll(app.start);
  // afterAll(app.stop);
  
  it('testing that api/v1/Tylers GET one by id route returns a 200 status code on success', () => {
    return superagent.get(`${apiURL}/7d418060-7376-11e8-b3e4-7b5560d0b48c`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });

  it('testing that api/v1/Tylers POST one route returns a 200 status code for valid request', () => {
    return superagent.post(apiURL)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
});