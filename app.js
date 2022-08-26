const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const fs = require('fs');
const coord = require('./coordinates');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

const svg = `<svg width="800" height="800" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>.base { font-family: Lato,sans-serif; margin:100px;}</style>
<g>
  <rect width="100%" height="100%" fill="none"/>
  <rect x="{3}" y="350" width="{1}" height="102" rx="19" fill="white"/>
  <rect x="{3}" y="350" width="{1}" height="102" rx="19" stroke="black" stroke-width="6"/>
  <text x="400" y="420" fill="black" font-size="60" font-weight="bold" class="base" text-anchor="middle">{2}</text>
</g>
</svg>
`;
let cities = [];
let i = 0;
const allFileContents = fs.readFileSync('cities.txt', 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line =>  {
        if (i in coord.coordinates) {
            // console.log(`Line from file: ${line}`);
            let s = svg.replace('{1}', coord.coordinates[i][0]);
            s = s.replace('{2}', line);
            s = s.replace('{1}', coord.coordinates[i][0]);
            s = s.replace('{3}', coord.coordinates[i][1]);
            s = s.replace('{3}', coord.coordinates[i][1]);
            // console.log(s);
            // console.log("");
            cities.push("data:image/svg+xml;base64," + Buffer.from(s).toString('base64'));
            i++;
        }
});

app.get("/", (req, res) => {
    res.render("index", { // index refers to index.ejs
        cities: cities,
    });
});

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
