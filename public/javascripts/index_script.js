const gamesTable = document.querySelector(".gamesTable");

let games;

axios.get('/getAllGames').then(resp => {
    games = resp.data
}).then(


);
