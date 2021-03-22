const mysql = require('mysql');
let url = require('url');
var http = require('http');

//Create remote connection with nodejs app

const db = mysql.createConnection({
    host: "localhost",
    user: "zbobliuc_node_indassign",
    password: "nodemysql123",
    database: "zbobliuc_node_indassign"
});

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    db.connect(function(err){
        if(err) {
            throw err;
        }
        console.log("DB connnected!");
    })
    db.query("SELECT * FROM `quote`", function (err, results) {
        if (err) { throw err; }
        console.log(results);
    
      });
});
server.listen();