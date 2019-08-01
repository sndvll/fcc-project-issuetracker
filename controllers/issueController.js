const Issue = require('../models/models.js').Issue;

const getIssues = (req, res) => {
  Issue.find({project: req.params.project}, (err, data) => {
    if(err) console.log(err);
    else res.json(data);
    console.log(data);
  });
};
const saveIssue = (req, res) => {
  console.log(req.body)
};
const updateIssue = () => {};
const deleteIssue = () => {};

module.exports = {
  get: getIssues,
  save: saveIssue,
  update: updateIssue,
  delete: deleteIssue
}