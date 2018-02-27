const express = require('express');
const app = express();
const connect = require('./database/connected');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const middleware = require('./http/middleware/middleware');
const connection = mysql.createConnection(connect);
connection.connect((err) =>{
    if (err) throw err;
    console.log("You are now connected...");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () =>{
    console.log("Connected Success! ");
});
//get all
app.get('/books', (req, res) =>{
    console.log(req);
    connection.query('select * from Book',  (error, results) =>{
        if (error) throw error;
        res.json(results);
    });
});
//get id
app.get('/book/:id',  (req, res) =>{
    connection.query('select * from Book where id=?', [req.params.id], (error, results) =>{
        if (error) throw error;
        res.json(results);
    });
});
//POST
app.post('/books',middleware , (req, res) =>{
    const postData  = req.body;
    connection.query('INSERT INTO Book SET ?', postData, (error, results ) =>{
        if (error) throw error;
        res.json(results);
    });
});
//PUT == update
app.put('/books/:id', (req, res) =>{
   connection.query('update Book set ? where id ="'+req.params.id+'"', req.body, (err) =>{
       if(err) throw err;
       res.send('Success...!');
   }) ;
});
//DELETE
app.delete('/books', (req, res) =>{
    console.log(req.body);
    connection.query('DELETE FROM `Book` WHERE `id`=?', [req.body.id], (error) =>{
        if (error) throw error;
        res.end('Delete Success!');
    });
});
