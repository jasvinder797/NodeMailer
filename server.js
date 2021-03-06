var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors())
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var port = process.env.PORT || 8000;
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'yourmail@gmail.com',
    pass: 'yourpassword'
  }
}));
 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.post("/email",function(req,res){

	var mailOptions = {
	  from: 'test@gmail.com',
	  to: req.body.to,
	  subject: req.body.subject,
	  text: req.body.message
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
        console.log(req.body);
        res.statuscode = 200;
        res.write(error);
        res.end();
	  } 
        //console.log(req.body);
        res.statuscode = 200;
      //  res.write('Email sent Successfully');
        res.end();
	    console.log('Email sent: ' + info.response);
	  
	}); 
	
})
app.listen(port);