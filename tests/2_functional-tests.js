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

const createTestIssue = (title, done, createdBy) => {
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
      
      let issueTitle = `test, ${Date.now()}`;
      
      afterEach(done => {
        deleteTestIssue({ title: issueTitle }, done)
      });
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          title: issueTitle,
          text: 'text',
          createdBy: 'Functional Test - Every field filled in',
          assignedTo: 'Chai and Mocha',
          status: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.title, issueTitle);
          assert.equal(res.body.text, 'text');
          assert.equal(res.body.createdBy, 'Functional Test - Every field filled in');
          assert.equal(res.body.assignedTo, 'Chai and Mocha');
          assert.equal(res.body.status, 'In QA');
          assert.equal(res.body.open, true);
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            title: issueTitle,
            text: 'text',
            createdBy: 'Functional Test - Required fields filled in'
          })
          .end(function(err, res) {
            assert.equal(res.body.title, issueTitle);
            assert.equal(res.body.text, 'text');
            assert.equal(res.body.createdBy, 'Functional Test - Required fields filled in');
            assert.equal(res.body.assignedTo, '');
            assert.equal(res.body.status, '');
            assert.equal(res.body.open, true);
            done();
          });
        
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            title: issueTitle,
            created_by: 'Functional Test - Missing required fields'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.propertyVal(res.body, 'message', 'missing required fields');
            done();
          });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      let testId;
      let issueTitle = `test, ${Date.now()}`;
      
      before(done => {
        createTestIssue(issueTitle, done, (id) => { testId = id; });
      });
      
      after(done => { deleteTestIssue({ _id: testId }, done); });

      test('No body', function(done) {
        chai.request(server)        
          .put('/api/issues/test')
          .send({ _id: testId })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, 'not updated');
            done();
          });
      });
      
      test('One field to update', function(done) {
        chai.request(server)        
          .put('/api/issues/test')
          .send({ _id: testId, title: 'new_title' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, `update successful, id: ${testId}`);
            done();
          });
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)        
          .put('/api/issues/test')
          .send({ _id: testId, title: 'new_title', text: 'new_text' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, `update successful, id: ${testId}`);
            done();
          });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      let issueTitle = `test, ${Date.now()}`;
      
      before(done => { createTestIssue(issueTitle, done); });
      
      after(done => { deleteTestIssue({ title: issueTitle}, done)});
      
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
