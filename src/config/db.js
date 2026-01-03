// mysql2/promise baglama
// process.env icindeki parametreler ile createPool olusturmak
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Erasyl_2005',
    database: process.env.DB_NAME || 'mini_shop',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
});
// const [rows] = await pool.execute(sql, params);
module.exports = pool;
