const mysql = require('mysql');

const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'akbar_ti23a'
}); 

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});


module.exports = connection;