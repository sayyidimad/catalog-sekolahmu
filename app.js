const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'catalog_app'
})

// Route
app.get('/', (req, res) => {
    connection.query('SELECT * FROM barang', (error, results) => {
        res.render('index.ejs', { items: results });
    })
})
app.get('/detail/:id', (req, res) => {
    connection.query('SELECT * FROM barang WHERE id = ?', [req.params.id], (error, results) => {
        res.render('detail.ejs', { item: results[0] });
    })
})
app.get('/contact', (req, res) => {
    res.render('contact.ejs');
})

app.listen(port, () => {
    console.log(`App run on port ${port}`);
})