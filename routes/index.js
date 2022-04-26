var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

const db = require('../database-functions');
const idgb = require('../igdb-api-calls');


function getAllGames(req, res, next) {
  db.findAllGames().then(games => {
    res.data = games;
    next();
  }).catch(err => {
    next(err);
});
}

function getMentionsOf(req, res, next){
  db.findMentionsWhereGameIs(req.params.id).then(mentions => {
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
    if(mention.id > highestEpID){
      highestEpID = mention.episode;
    }
  });

  db.findEpByPrimaryKey(highestEpID).then(ep =>{
    res.ep = ep;
    next();
  })
}

function getRecentGames(req, res, next){
  db.findMostRecentMentions().then(games =>{
    res.data = games;
    next();
  });
}

function getGameById(req, res, next){
  db.findGameByPrimaryKey(req.params.id).then(game => {
    res.data = game;
    next();
  })
}

function getGameCoverByIgdbId(req, res, next){
  idgb.getGameCover(req.params.igdbID).then(cover =>{
    console.log("HRELLO HELLO HELLRO");
    console.log(cover);
    res.cover = cover;
    next();
  })
}

router.get('/getGameCoverByIgdbId/:igdbID', getGameCoverByIgdbId, function(req, res){
  res.send(res.cover)
});

router.get('/getMostRecentGames', getRecentGames, function(req, res){
  res.send(res.data)
});

router.get('/getAllGames', getAllGames, function(req, res){
  res.send(res.data);
});

router.get('/getMentionsOf/:id', getMentionsOf, function(req, res){
  res.send(res.data);
});

router.get('/getMostRecentMentionsOf/:id', [getMentionsOf, getMostRecentEp], function(req, res){
  res.send(res.ep);
});

router.get('/getGameById/:id', getGameById, function (req, res){
  res.send(res.data)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TripleClickDB' });
});

module.exports = router;
