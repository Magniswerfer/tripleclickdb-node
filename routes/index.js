var express = require('express');
var router = express.Router();

const db = require('../database-functions');

function getAllGames(req, res, next) {
  db.findAllGames().then(games => {
    console.log(games);
    res.data = games;
    next();
  }).catch(err => {
    next(err);
});
}

router.get('/getAllGames', getAllGames, function(req, res){
  res.end(res.data);
});


/* GET home page. */
router.get('/', /*getAllGames,*/ function(req, res, next) {
  res.render('index', { title: 'TripleClickDB' });
});

module.exports = router;
