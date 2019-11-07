const pushbullet = require('pushbullet')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')
const sql = `SELECT * FROM data ORDER BY id DESC LIMIT ${1}`
require('dotenv').config()

var pusher = new pushbullet(process.env.PUSHBULLET_TOKEN)

db.get(sql, [], (err, row) => {
  if (err) throw err;
  // console.log('row :', row);
  if (row.etat === 0) {
    let msg, title
    msg = "Temperature: " + row.temperature + "°C"
    title = `\u26A0  ATTENTION BIERE `
    if(row.temperature > 20) title += `\uD83D\uDD25`
    else title += `\u2744`
    
    pusher.note(process.env.EMAIL, title, msg, (err, _res) =>{
      if (err) throw err;
    })
  }
})
