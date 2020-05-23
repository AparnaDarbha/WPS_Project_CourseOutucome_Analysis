var express = require('express');
   var path = require('path');
   var mysql = require('mysql');
   var connection = mysql.createConnection({
       host     : 'localhost',
       user     : 'root',
       password : '',
       database : 'project'
   });
   
 
  var router = express.Router();
  router.post('/',function(req, res){ 
    let val=new Array();
    for(let i=0;i<=1;i++)
    {
        for(let j=0;j<=4;j++)
        {
            console.log(req.body['checkbox'+i]);//we will use this rugth ok
            //i think it will push all values or should we specify value? we will check before pushing
            //is this crt i think this is enough maybe what abt each individual checkbox in this grp?i dont know we will see
            //we will execute and see? ok 
            //i am thinking its bettrt to do cn we wont include this part then? this looks time taking yes 
            //we will do later then  first cn ok
        }
        console.log(val);
    }
    console.log('val'+val);
  });
  module.exports = router;