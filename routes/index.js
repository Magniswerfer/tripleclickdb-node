var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

const db = require('../database-functions');


function getAllGames(req, res, next) {
  db.findAllGames().then(games => {
    res.data = games;
    next();
  }).catch(err => {
    next(err);
});
}

function getMentionsOf(req, res, next){
  db.findMentionsWhereGameis(req.params.id).then(mentions => {
    res.data = mentions;
    next();
  }).catch(err => {
    next(err);
});
}

function getMostRecentEp(req, res, next){
  let allMentions = JSON.parse(res.data);
    
  let highestEpID = 0;
  allMentions.forEach(mention => {
    console.log("Mention: ")
    console.log(mention);
    if(mention.id > highestEpID){
      highestEpID = mention.episode;
      console.log("highed ep id now: " + highestEpID)
    }
  });

  db.findEpByPrimaryKey(highestEpID).then(ep =>{
    res.ep = ep;
    console.log(res.test);
    next();
  })
}

router.get('/getAllGames', getAllGames, function(req, res){
  res.send(res.data);
});

router.get('/getMentionsOf/:id', getMentionsOf, function(req, res){
  res.send(res.data);
});

router.get('/getMostRecentMentionsOf/:id', [getMentionsOf, getMostRecentEp], function(req, res){
  res.send(res.ep);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TripleClickDB' });
});

module.exports = router;
