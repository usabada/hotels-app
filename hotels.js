var express = require('express')
var https = require('https')
var httprequest = require('request')
var app = express();
//var apiKey = <API_KEY>
var searchEngine = "017701879507350802094:xsmbccclboc"
var searchURL = "www.googleapis.com"
var options = {
    host:searchURL,
    path:"/customsearch/v1?q=10%2bBest%2bHotels%2bin%2b",
    method:'GET'
}

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
    })

app.get('/process_get', function (req, res) {
       options.path +=req.query.location+"&key="+apiKey+"&cx="+ searchEngine;
       console.log(options)
       var finallink = ''
       var req1 = https.request(options, function(response) {
	   console.log('STATUS:'+response.statusCode);
	   var body = '';
	    response.on('data',function(chunk) {
		    body += chunk.toString();
	   })
	   response.on('end', function() {
               var val = JSON.parse(body)
	       finallink = val.items[0].link;
               console.log("Final Link = ",finallink)
               httprequest(finallink, function (error, rs, b) {
		       if (error) {
			   console.log("Final link error = ",error);
		       }
		       console.log("Body for final link = ",b);
	            if (!error && rs.statusCode == 200) {
                        res.end(b);
	            }
		    else {
			res.end();
		    }
               })
           })
       })
       req1.on('error', function(err) {
	    console.log("Error occurred",err)
	})
       req1.end()
       console.log("completed request");
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s,%s",host, port)
})



