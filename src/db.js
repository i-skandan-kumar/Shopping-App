const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "shoppingdb",
    password: "ShoplcEngineers",
    post: 5432,
});

module.exports = pool;