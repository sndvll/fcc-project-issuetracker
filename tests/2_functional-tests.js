/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Issue = require('../models/models.js').Issue;
const Project = require('../models/models.js').Project;

chai.use(chaiHttp);

const createTestIssue = (title, createdBy, done) => {
  const issue = new Issue({
    title, text: 'test', createdBy: 'tester'
  });
  issue.save()
    .then(res => {
      console.log(`test issue created: ${res.title}`);
      if(createdBy) {
        createdBy(res._id);
      }
      done();
    })
    .catch(err => {
      console.log('error', err);
      done();
    });
}

const deleteTestIssue = (filter, done) => {
  const key = Object.keys(filter)[0];
  Issue.findOneAndDelete(filter)
    .then(res => {
      console.log(`test issue deleted: ${res[key]}`);
      done();
    })
    .catch(err => {
      console.log('error', err);
      done();
    });
}

const createTestProject = (projectName, done) => {
  const project = new Project({
    projectName
  });
  project.save()
    .then(res => {
      console.log(`test project created: ${res.projectName}`);
      done();
    })
    .catch(err => {
      console.log('error', err);
      done();
    });
}

const deleteTestProject= (filter, done) => {
  const key = Object.keys(filter)[0];
  Project.findOneAndDelete(filter)
    .then(res => {
      console.log(`test project deleted: ${res[key]}`);
      done();
    })
    .catch(err => {
      console.log('error', err);
      done();
    });
}

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      let issueTitle
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          
          //fill me in too!
          
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        
      });
      
      test('Missing required fields', function(done) {
        
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        
      });
      
      test('One field to update', function(done) {
        
      });
      
      test('Multiple fields to update', function(done) {
        
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        
      });
      
      test('Valid _id', function(done) {
        
      });
      
    });

});
