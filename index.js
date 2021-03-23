const jsdom = require('jsdom');
const moment = require('moment');
const superagent = require('superagent');

const config = require('./config');
const { JSDOM } = jsdom;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

(async () => {
const { text } = await superagent.get(config.playlistEndpoint);

const { document } = (new JSDOM(text)).window;
const lines = document.querySelectorAll('table.tbl-result tbody tr');
console.log("nb lignes", lines.length);
const plays = [];
lines.forEach((line) => {
    const time = (line.querySelector('.horaire') || {}).textContent;
    if (time) {
        plays.push({
            time: moment(time, 'DD/MM/YYYY HH:mm'),
            artist: line.querySelector('.artiste a').textContent,
            title: line.querySelector('.titre').textContent,
        });
    }
});
console.log(plays);
}) ();
