var express = require('express');
var router = express.Router();
var PouchDB = require('pouchdb');
var db = new PouchDB('icici_events_db');
var _ = require('lodash');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/webhook/icici-delete-db', function(req, res, next) {
  db.destroy().then(function (response) {
    db = new PouchDB('icici_events_db');
    res.json({"status": "deleted"})
  }).catch(function (err) {
    console.log(err);
  });
});


router.post('/webhook/icici-p3-events', function(req, res, next) {
  let eventPayload = req.body;
  var id = (new Date()).getTime();
  eventPayload['docId'] = id;

  console.log(eventPayload);
  db.post(eventPayload).then(function(response){
    console.log(response);
  }).catch(function(err){
    console.log(err)
  })

  res.json({"status": "ok"})
});


router.get('/webhook/get-icici-events', function(req, res, next) {
  db.allDocs({
    include_docs: true,
    attachments: true,
    descending: true
  }).then(function (result) {
    console.log(result);
    let sortedResults = _.sortBy(result.rows, 'docId');
    res.json({"events": sortedResults});
  }).catch(function (err) {
    console.log(err);
  });
});


module.exports = router;
