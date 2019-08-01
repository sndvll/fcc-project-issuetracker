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
    
  },
  status: {},
  createdOn: {},
  updatedOn: {},
  open: {},
  project: {}
});



module.exports = {
  Project: model('Project', ProjectSchema)
}