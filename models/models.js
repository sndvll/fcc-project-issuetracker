const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  issues: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Issue'
  }]
});

const IssueSchema = new Schema({
  issue_title: {
    type: String, required: true, min: 1, max: 200
  },
  created_by: {
    type: String, required: true, min: 1, max: 30
  },
  assigned_to: {
    type: String, default: '', min: 1, max: 30
  },
  issue_text: {
    type: String, required: true, min: 1, max: 300
  },
  status_text: {
    type: String, default: '', min: 1, max: 200
  },
  created_on: {
    type: String, default: new Date()
  },
  updated_on: {
    type: String, default: new Date()
  },
  open: {
    type: Boolean, default: true
  },
  project: {
    type: String, required: true
  }
});


module.exports = {
  Project: model('Project', ProjectSchema),
  Issue: model('Issue', IssueSchema)
}