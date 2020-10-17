const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('/db/colyseus/main')

const query = util.promisify(db.all)

module.exports = {
  getUsers: async function() {
    return await query('SELECT * FROM users',[])
  }
}