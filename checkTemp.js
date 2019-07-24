const pushbullet = require('pushbullet')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')
const sql = `SELECT * FROM data ORDER BY id DESC LIMIT ${1}`
require('dotenv').config()

var pusher = new pushbullet(process.env.PUSHBULLET_TOKEN)

db.get(sql, [], (err, row) => {
  if (err) throw err;
  console.log('row :', row);
  if (row.etat === 0) {
    let msg, title
    msg = "Temperature: " + row.temperature + "°C"
    title = `\u26A0  ATTENTION BIERE `
    if(row.temperature > 20) title += `\uD83D\uDD25`
    else title += `\u2744`
    
    pusher.note('vic16@hotmail.be', title, msg, (err, res) =>{
      if (err) throw err;
    })
  }
})


/* 
  DEVICES:
  PC-Portable: 'ujDyoQ0xD40sjC2nMzCNjg'
  GSM: 'ujDyoQ0xD40sjAreMkVTQ4'
  PC-Fixe: 'ujDyoQ0xD40sjz1KiZlY9A'
*/