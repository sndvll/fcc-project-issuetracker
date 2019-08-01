/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB;

const issues = require('../controllers/issueController.js');

module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(issues.get)
    .post(issues.save)
    .put(issues.update)
    .delete(issues.delete);
    
};
