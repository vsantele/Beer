const sqlite3 = require('sqlite3').verbose()
const express = require("express")

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


// app.get('/data', async function(req, res) {
//   try {
//     getLast(res)
//   } catch (error) {
//     console.log('error :', error);
//     res.send("error", error)
//   }
// })

app.get('/data', async function(req, res) {
  console.log(req.query.temperature)
  if(req.query.temperature > 20) {
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

app.listen(3000, function() {
  console.log("App listening on port 3000")
})