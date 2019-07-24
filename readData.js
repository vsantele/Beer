const sqlite3 = require('sqlite3').verbose()

const nbLast = process.argv[2] || 5

const sql = `SELECT * FROM data ORDER BY id DESC LIMIT ${nbLast}`

const db = new sqlite3.Database('./data.db')

db.serialize(function() {
  db.all(sql, (err, rows) => {
    if (err) {
      throw err
    }
    console.log("ID \t\t date et heure \t\t temp \t\t hum \t\t etat")
    rows.forEach(row => {
      console.log(row.id + "\t\t " + row.timestamp + "\t " + row.temperature + "\t\t " + row.humidite + "\t\t " + row.etat)
    })
  })
})