const Issue   = require('../models/models.js').Issue;
const Project = require('../models/models.js').Project;


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
      .catch(err => {
        if (process.env.NODE_ENV === 'test') console.log('findOneAndUpdate Error: ' + err)
      });
  })
  .catch(err => {
    if(process.env.NODE_ENV === 'test') console.log('save Issue error: ' + err);
    res.json({ message: 'missing inputs' });
  });
};

const updateIssue = (req, res) => {
  let updatedIssue = {};
  const { _id } = req.body;
  const fieldsForUpdate = ['issue_title', 'created_by', 'issue_text', 'assigned_to', 'status_text', 'open'];
  for (let field in req.body) {
    fieldsForUpdate.forEach(value => {
      if (value == field) {
        updatedIssue[field] = req.body[field];
      }
    });
  };
  updatedIssue.updated_on = new Date();
  const hasUpdated = Object.keys(updatedIssue).length > 1;
  if(hasUpdated) {
    Issue.findByIdAndUpdate(_id, updatedIssue, { new:true })
      .then(data => {
        res.json({message: `update successful, id: ${data._id}`})
      })
  } else {
    res.json({ message: 'not updated' });
  }
};

const deleteIssue = (req, res) => {
  const { _id } = req.body;
  if(_id) {
    console.log(_id);
    Issue.findByIdAndDelete(_id)
      .then(() => {
        res.json({ message: `deleted ${_id}`})
      })
      .catch(err => {
        res.json({ message: `could not delete ${_id}`})
      })
  } else {
    res.json({ message: '_id error'})
  }
};

module.exports = {
  get: getIssues,
  save: saveIssue,
  update: updateIssue,
  delete: deleteIssue
}

