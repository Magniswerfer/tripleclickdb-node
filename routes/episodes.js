var express = require('express');
var router = express.Router();

const db = require('../database-functions');

async function getEpisodeInfo(req, res, next){
    await db.findEpByPrimaryKey(req.params.id).then(info =>{
        res.episodeInfo = info;
        console.log(res.episodeInfo);
    })
    next()
}

router.get('/:id', getEpisodeInfo, function(req, res, next) {
    res.render('episodes', {episodeInfo : res.episodeInfo});
});

module.exports = router;