const Pool  = require('pg').Pool;
const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"students",
    password:"ruhulamin",
    port:5432
});


module.exports = pool;
