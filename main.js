const express = require('express');
const app = express();
const connect = require('./connected');
const mysql      = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection(connect);
connection.connect(function(err) {
    if (err) throw err;
    console.log("You are now connected...");
});
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log("Connected Success! ");
});
//get all
app.get('/books', function (req, res) {
    console.log(req);
    connection.query('select * from new_book', function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});
//get id
app.get('/books/:id', function (req, res) {
    connection.query('select * from new_book where id=?', [req.params.id], function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});
//post
app.post('/books', function (req, res) {
    const postData  = req.body;
    connection.query('INSERT INTO new_book SET ?', postData, function (error, results ) {
        if (error) throw error;
        res.json(results);
    });
});
//put == update
app.put('/books/:id',function(req, res) {
   connection.query('update new_book set ? where id ="'+req.params.id+'"', req.body, (err) => {
       if(err) throw err;
       res.send('Success...!');
   }) ;
});
// delete
app.delete('/books', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `new_book` WHERE `id`=?', [req.body.id], function (error) {
        if (error) throw error;
        res.end('Delete Success!');
    });
});
