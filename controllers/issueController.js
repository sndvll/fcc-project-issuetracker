const Issue = require('../models/models.js').Issue;

const getIssues = (req, res) => {
  Issue.find({project: req.params.project}, (err, data) => {
    if(err) console.log(err);
    else res.json(data);
    console.log(data);
  });
};
const saveIssue = (req, res) => {
  const project = req.params.project;
  const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
  console.log('sta', req.body);
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
    console.log('data', data);
  })
  .catch(err => console.log(err));
};
const updateIssue = () => {};
const deleteIssue = () => {};

module.exports = {
  get: getIssues,
  save: saveIssue,
  update: updateIssue,
  delete: deleteIssue
}