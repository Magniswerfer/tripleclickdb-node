coverArtElement = document.querySelector('.cover-art');
igdbID=gameInfo.id;

console.log(gameInfo);

axios.get('/getGameCoverByIgdbId/'+igdbID).then(cover =>{
    let imageID = cover.data.body[0].image_id;
    coverArtElement.src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + imageID + ".png";
  });