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
  console.log(req.body)
  /*const issue = new Issue({
    issue_title: req.body.issue_title,
    description: req.body.description
  })*/
};
const updateIssue = () => {};
const deleteIssue = () => {};

module.exports = {
  get: getIssues,
  save: saveIssue,
  update: updateIssue,
  delete: deleteIssue
}