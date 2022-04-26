var express = require('express');
var router = express.Router();

const db = require('../database-functions');
const igdb = require('../igdb-api-calls');

function getGameByURL(req, res, next) {
  db.findGameByPrimaryKey(req.params.id).then(game => {
    res.gameTitle = game.name;
    req.igdbID = game.igdbID;
    next();
}).catch(err => {
    next(err);
});
}

function getGameInfo(req, res, next){
    igdb.getGameInfo(req.igdbID).then(gameInfo => {
        res.data = gameInfo.body;
        res.data.release_year = new Date(parseInt(gameInfo.body.first_release_date)*1000).getFullYear();
        next();
    }).catch(err => {
        next(err);
    });
}

/* GET Game info from IGDB page. */
router.get('/getGameInfo/:id', getGameInfo, function(req, res, next) {
    res.send(res.data);
});

/* GET game by URL page. */
router.get('/:id', [getGameByURL, getGameInfo], function(req, res, next) {
    res.locals.require = require;
    res.render('games', { title: res.gameTitle, gameInfo: res.data});
});

module.exports = router;