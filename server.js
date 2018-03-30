var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var port = process.env.PORT || 8000;
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'ss4u.team.node@gmail.com',
    pass: 'Marchend'
  }
}));
 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.post("/email",function(req,res){

	var mailOptions = {
	  from: 'divya@gmail.com',
	  to: req.body.to,
	  subject: req.body.subject,
	  text: req.body.message
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	}); 
	console.log(req.body);
	res.statuscode = 200;
	res.write("hello");
	res.end();
})
app.listen(port);