const { Pool } = require('pg');



let pool = new Pool(
    {
        host: 'localhost',
        user: 'postgres',
        password: '4005',
        database: 'webtech21products'
    }
)
/* write your code to initialize connection pool using node-postgres */


module.exports = pool;