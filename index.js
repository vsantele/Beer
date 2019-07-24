const sqlite3 = require('sqlite3').verbose()
const express = require("express")
const moment = require('moment')
require('moment-timezone')

const app = express();
const db = new sqlite3.Database('./data.db')

let etat = true

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    temperature FLOAT NOT NULL, 
    humidite FLOAT NOT NULL,
    etat BOOL NOT NULL
    )`)
})

// async function getLast(res) {
async function getLast() {
  var data
  await db.get(`SELECT id, temperature, humidite FROM data
  ORDER BY id DESC
  LIMIT 1;`, [], function(err, row) {
    if (err) {
      throw err
    }
    console.log('data :', data);
    return row
  })
  return data
}

app.use(express.static('./static'))

app.get('/all', async function(req, res) {
  let limit = req.query.limit || 5
  db.all(`SELECT id, temperature, humidite, timestamp, etat FROM data
  ORDER BY id DESC
  LIMIT ?;`, [limit], function(err, rows) {
    if (err) {
      throw err
    }
    console.log('data :', rows);
    res.send(rows)
  })
})

app.get('/data', async function(req, res) {
  console.log(req.query.temperature)
  if(req.query.temperature > 25) {
    console.log(`Temperature trop haute!(${req.query.temperature})`)
    etat = false
  } else if (req.query.temperature < 15) {
    console.log(`Temperature trop basse! (${req.query.temperature})`)
    etat = false
  } else {
    etat = true
  }
  db.run(`INSERT INTO data (temperature, humidite, etat) VALUES (${req.query.temperature}, ${req.query.humidite}, ${etat})`)
  
  res.send("Got post request")

})

app.get('/7-days', async function (req, res) {
  db.all(`SELECT timestamp, temperature, humidite FROM data WHERE timestamp > ?`,[moment().tz("UTC").subtract(7, "days").format('YYYY-MM-DD H:mm:ss')],(err, rows) => {
    if (err) throw err;
    console.log(rows)
    res.send(rows)
  })
})

app.listen(3000, function() {
  console.log("App listening on port 3000")
})