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

const issueController = require('../controllers/issueController.js');

/*
MongoClient.connect(CONNECTION_STRING, function(err, db) {
  console.log('db connection successful');
}); 
*/

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(issueController.get, function (req, res){
      var project = req.params.project;
      console.log('project: ', project);
    })
    
    .post(function (req, res){
      var project = req.params.project;
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
