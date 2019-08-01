const Issue   = require('../models/models.js').Issue;
const Project = require('../models/models.js').Project;

const catchUndi

const getIssues = (req, res) => {
  Issue.find({project: req.params.project}, (err, data) => {
    if(err) console.log(err);
    else res.json(data);
  });
};
const saveIssue = (req, res) => {
  const project = req.params.project;
  const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
  const issue = new Issue({
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    open: true,
    project
  })
  .save()
  .then(data => {
    Project.findOneAndUpdate({project: project}, { $push: {issues: data._id}})
      .then(() => {
        res.json(data);
      })
      .catch(err => console.log('findOneAndUpdate Error: ' + err));
  })
  .catch(err => console.log('save Issue error: ' + err));
};
const updateIssue = () => {};
const deleteIssue = () => {};

module.exports = {
  get: getIssues,
  save: saveIssue,
  update: updateIssue,
  delete: deleteIssue
}

