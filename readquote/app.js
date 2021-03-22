var http = require('http');
let url = require('url');
const mysql = require('mysql');

//Create remote connection with nodejs app

const db = mysql.createConnection({
    host: "localhost",
    user: "zbobliuc_node_indassign",
    password: "nodesql123",
    database: "zbobliuc_node_indassign"
});

var server = http.createServer(function(req,res){
    let q = url.parse(req.url,true);
    res.writeHead(200,{'Content-Type':'text/plain', 
    "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "*"
    });
    db.connect(function(err){
        if(err) {
            throw err;
        }
        db.query("SELECT * FROM `quote`", function (err, results) {
        if (err) { throw err; }
        res.end(JSON.stringify(results));
      });
    });
   
});
server.listen();