var nodemailer = require('nodemailer');
var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project'
});
var async = require('async');

var router=express.Router();
router.post('/', async function(request, response) {//it isnt working 
  var name_email={};
  var dates=request.body.send_mail_date;
  connection.query('select Name,email from userinfo', function(error, results, fields) {
    let i=0;
            if(error)
            {
                console.log(error);
                return ;//we will try here ok
            }
            while(i<results.length)
            {
              name_email[results[i].Name]=results[i].email;
              console.log('inside query'+ name_email[results[0].Name]);
                i++;
            }//i think date isnt sent when we redirected ok but itis workingit is 
            //we store val in session then? ok wee will use demo1 ok
  });
  connection.query('select Name,course from courses', function(error, results, fields) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',//
    secure: false,
    port: 25,
    auth: {
      user: 'dummy.darbhas@gmail.com',
      pass: 'venkatesa'
    }, tls: {
      rejectUnauthorized: false
    }
  });
  //console.log(name_email[results[0].Name]);
  let i=0;
  while(i<results.length){
  var mailOptions = {
    from: 'dummy.darbhas@gmail.com',
    to:  name_email[results[i].Name],
    subject: 'Deadline Regd.',
    text: 'Dear '+results[i].Name+'\n DeadLine to enter marks for your course '+results[i].course+' is set to: \n'+request.body.send_mail_date 
  };
  i++;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
 });
 //there is some error yes but i got mail all 3 times
var data={dates:dates};//we have to do that 2 days before mails and also front end yes
//response.redirect('/demo1');//wew ill write in diff page and try? ok we will redirevt from demo1 to demo ok
response.render('date_set_display',{data:data});
});


module.exports = router;