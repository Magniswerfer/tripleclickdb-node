const gamesTableBody = document.querySelector(".gamesTableBody");
const recentGamesWrapperInner = document.querySelector(".recentGamesWrapperInner");

// Get most recently discussed games and display their cover art
axios.get('/getMostRecentGames').then(resp =>{
    recentGames = resp.data;
    recentGames.forEach(mention =>{
        let recentGame = document.createElement('a');
        axios.get('/getGameById/'+ mention.game).then(game =>{
            console.log(game);
            recentGame.title = game.data.name
            recentGame.href = "/games/"+game.data.id;
            recentGame.classList.add("recent-game-mention-link");
            axios.get('/getGameCoverByIgdbId/'+game.data.igdbID).then(cover =>{
              let imageID = cover.data.body[0].image_id;
              let gameCover = document.createElement('img');
              gameCover.src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + imageID + ".png";
              gameCover.alt = "Cover art for" + game.data.name;
              gameCover.classList.add("recent-game-mention");
              recentGame.appendChild(gameCover);
              recentGamesWrapperInner.appendChild(recentGame);
            });
        }); 
    });
});
//  <img class="recent-game-mention" data-recent-mention-gameID="{{newestGamesIGDB[i]}}" src="/assets/img/loading-gif.gif" alt="Cover art for {{newestGamesTitle[i]}}">
//<a class="recent-game-mention-link" title="{{newestGamesTitle[i]}}" href="{{newestGamesURL[i]}}"></a>

// Get all games, and put them in a big table
axios.get('/getAllGames').then(resp => {
    let games = resp.data;
    games.forEach(game => { // run through all games
        let newRow = document.createElement("tr") // create element for all games

        // Create first cell in each row, and make it a link to the game page.
        let col1 = document.createElement('td'); 
        let gameLinkElement = document.createElement('a');
        let linkText = document.createTextNode(game.name); // put the name of  the game as link
        gameLinkElement.appendChild(linkText); 
        gameLinkElement.title = game.name;
        gameLinkElement.href = "/games/"+game.id; // make it reference our API
        col1.appendChild(gameLinkElement);
        
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');

        let epName;
        let epDate;
        //Most recent mentions
        axios.get('/getMostRecentMentionsOf/'+game.id).then(resp =>{ // get the most recent mention of the game
            epName = resp.data.name;
            epDate = resp.data.date;

            let epYear = epDate.toString().slice(0, 4);
            let epMonth = epDate.toString().slice(5, 6);
            let epDay = epDate.toString().slice(7, 8);

            epDate = epYear + "-" + epMonth + "-" + epDay; // format the date (this is ugly, but works lols)

            let date = new Date (epDate)
            
            col2.innerHTML = epName;
            col3.innerHTML = date.toLocaleDateString('en', { year:"numeric", month:"short", day:"numeric"}) ;
        
        });
        
        let col4 = document.createElement('td');
        axios.get('/getMentionsOf/'+game.id).then(resp =>{ // get the number of times the game was mentioned
            mentions = resp.data.length
            col4.innerHTML = mentions;
        });

        //Create the rest of the cells... Implement later lolz
        
        
        //Append all cells to the row
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        newRow.appendChild(col3);
        newRow.appendChild(col4);

        // Then append the row to the table
        gamesTableBody.appendChild(newRow);
    });
});

function searchGames() {
    
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("frontPageGamesTable");
    let tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }