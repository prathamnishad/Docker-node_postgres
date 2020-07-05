const express = require('express');
var bodyParser = require("body-parser");
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "postgres",
    port: 5432,
    database: "postgres"
})
pool.query(`CREATE TABLE IF NOT EXISTS todo (id SERIAL PRIMARY KEY,description VARCHAR(255))`);
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4000);

var inp;

app.get('/', async function q(req, res, next) {
    const data = await pool.query("SELECT * FROM todo")
    res.render("doc.ejs", { data: data.rows });
});

app.post('/new', async function (req, res, next) {
    const q = "INSERT INTO todo(description)VALUES($1)";
    const data = await pool.query(q, [req.body.docker.desc]);

    res.redirect("/");
});

app.post('/ew/:id', async function (req, res, next) {
    const q = "DELETE FROM todo WHERE id=$1";
    const data = await pool.query(q, [req.params.id]);
    res.redirect("/");
});
app.post('/update/:id', async function (req, res, next) {
    const q = "UPDATE todo SET description = $1 WHERE id=$2";
    const data = await pool.query(q, [req.body.update, req.params.id]);
    res.redirect("/");
});
app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});