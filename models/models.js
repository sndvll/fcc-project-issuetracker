const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const ProjectSchema = new Schema({
  projectName: {
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
  title: {
    type: String, required: true, min: 1, max: 200
  },
  text: {
    type: String, required: true, min: 1, max: 200
  },
  createdBy: {
    type: String, required: true, min: 1, max: 30
  },
  assignedTo: {
    type: String, default: '', min: 1, max: 30
  },
  status: {
    type: String, default: '', min: 1, max: 30
  },
  createdOn: {
    type: String, default: new Date()
  },
  updatedOn: {
    type: String, default: new Date()
  },
  open: {
    type: Boolean, default: true
  },
  project: {
    type: String, required: true
  }
});

export const Project = model('Project', ProjectSchema);
export const Issue = model('Issue', IssueSchema);
