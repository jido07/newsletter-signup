
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;

  var data = {
  	members : [{
  		email_address: email,
  		status : "subscribed",
  		merge_fields :{
  			FNAME : fName,
  			LNAME : lName
  		}
  	}]
  }
  var jsonData = JSON.stringify(data);
  var url= "https://us7.api.mailchimp.com/3.0/lists/77261ff1b8";
  var options = {
  	method : "post",
  	auth : "babajide:4ab492f8b35044292dc758fef1242c1f-us7"
  }
 const request = https.request(url, options, function(response){
 	if(response.statusCode === 200){
 		res.sendFile(__dirname + "/success.html")
 	}else{
 		res.sendFile(__dirname + "/failure.html")
 	}
     response.on("data", function(data){
     	console.log(JSON.parse(data))
     })
  })
 // request.write(jsonData);
request.end();
})

app.post("/failure", function(req, res){
	res.redirect("/")
})
app.listen(3000, function(){
	console.log("server up and running!")
})