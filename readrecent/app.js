var http = require('http');
var url = require('url');
var mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "zbobliuc_node_indassign",
    password: "nodesql123",
    database: "zbobliuc_node_indassign"
});
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain',
            "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "*"
    });
    db.connect(function(err){
        if(err) {
            throw err;
        }
        
        db.query("SELECT * FROM `quote` ORDER BY quoteID DESC LIMIT 0,1", function (err, results) {
        if (err) { throw err; }
        console.log("Recent!");
        res.end(JSON.stringify(results));
      });
    });
});
server.listen();
