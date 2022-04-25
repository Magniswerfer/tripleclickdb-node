const gamesTableBody = document.querySelector(".gamesTableBody");

let games;

axios.get('/getAllGames').then(resp => {
    games = resp.data;
    games.forEach(game => {
        let newRow = document.createElement("tr")

        // Create first cell in each row, and make it a link to the game page.
        let col1 = document.createElement('td');
        let gameLinkElement = document.createElement('a');
        let linkText = document.createTextNode(game.name);
        gameLinkElement.appendChild(linkText); 
        gameLinkElement.title = game.name;
        gameLinkElement.href = "/games/"+game.id;
        col1.appendChild(gameLinkElement);
        
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');

        let epName;
        let epDate;
        //Most recent mentions
        axios.get('/getMostRecentMentionsOf/'+game.id).then(resp =>{
            epName = resp.data.name;
            epDate = resp.data.date;

            let epYear = epDate.toString().slice(0, 4);
            let epMonth = epDate.toString().slice(5, 6);
            let epDay = epDate.toString().slice(7, 8);

            epDate = epYear + "-" + epMonth + "-" + epDay;

            let date = new Date (epDate)
            
            col2.innerHTML = epName;
            col3.innerHTML = date.toLocaleDateString('en', { year:"numeric", month:"short", day:"numeric"}) ;
        
        });
        
        let col4 = document.createElement('td');
        axios.get('/getMentionsOf/'+game.id).then(resp =>{
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
