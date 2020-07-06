const { Pool } = require('pg')
const config = require('./config')
const pool = new Pool({
  user: config.db_user,
  host: config.db_host,
  database: config.db_name,
  password: config.db_pwd,
  port: config.db_port,
})


module.exports = {
    query: async (text, params) => { 
      // pool.query(text, params)
      var result;
      await pool.connect()
        .then(async (client) => {
        await client.query(text, params)
            .then(res => {
                console.log("DB Query result: " + JSON.stringify(res) + "\n");
                result = res;
            })
            .catch(err => {
                console.error(err);
            });
    })
    .catch(err => {
        console.error(err);
    });
    return result;  
  },
}