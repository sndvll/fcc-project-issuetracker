const Issue = require('../models/models.js').Issue;

const getIssues = (req, res, next) => {
  Issue.find({project: req.params.project})
    .then(data => {
      console.log(process.env.NODE_ENV === 'test' ? data : '');
      req.body = data;
      next();
    })
    .catch(err => console.log(`Error: ${err}`));
};
const saveIssue = () => {};
const updateIssue = () => {};
const deleteIssue = () => {};

module.exports = {
  get: getIssues,
  save: saveIssue,
  update: updateIssue,
  delete: deleteIssue
}