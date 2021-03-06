const axios = require('axios');
const sprintf = require('sprintf-js').sprintf;

const headers = {"Client-ID": "${{ secrets.CLIENT_ID}}",        // DO SOMETHING ABOUT HAVING THESE EXPOSED!
"Authorization" : "Bearer ${{ secrets.AUTH_TOKEN}}"};

async function getGameInfo (igdbID){
    let igdbid = igdbID;
    let someString = sprintf('fields name, summary, first_release_date, url; where id = %i;', igdbid);

    const api = 'https://api.igdb.com/v4/games'

    const response = await axios({
            method: 'post',
            url: api,
            headers: headers,     
            data: someString
        });

        return {
            statusCode: 200,
            body: response.data[0]
        }
}

async function getGameCover (igdbID){
    let igdbid = igdbID;
    let someString = sprintf('fields image_id; where game = %i;', igdbid);

    const api = 'https://api.igdb.com/v4/covers'

    const response = await axios({
            method: 'post',
            url: api,
            headers: headers, 
            data: someString
        });

        return {
            statusCode: 200,
            body: response.data
        }
}

module.exports = {getGameInfo, getGameCover}