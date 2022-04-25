var express = require('express');
var router = express.Router();

const db = require('../database-functions');

function getGameByURL(req, res, next) {
  db.findGameByPrimaryKey(req.params.id).then(game => {
    res.gameTitle = game.name;
    next();
}).catch(err => {
    next(err);
});
}

/* GET home page. */
router.get('/:id', getGameByURL, function(req, res, next) {
    res.render('games', { title: res.gameTitle })
});

module.exports = router;