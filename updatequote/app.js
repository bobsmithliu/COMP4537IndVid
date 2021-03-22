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
    res.writeHead(200,{'Content-Type':'text/plain', 
    "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "*"
    });
    let q = url.parse(req.url,true);
    let id = q.query["id"];
    let newQuote = q.query["entry"];
    let newAuthor = q.query["author"];
    db.connect(function(err){
        if(err) {
            throw err;
        }
        db.query("UPDATE `quote` SET quoteEntry = '" + newQuote + "', quoteAuthor = '" + newAuthor + "' WHERE quoteID =" + id , function (err, results) {
        if (err) { throw err; }
        console.log("Updated!");
      });
    });
   res.end("Connected");
});
server.listen();