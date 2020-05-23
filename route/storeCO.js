var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project'
});
var router=express.Router();
router.post('/',function(request,response){
    let course=request.session.courses;//is this crt? 
    for(let i=0;i<5;i++){
        let desc=`request.body.co`+i;////this? i dont know did we store this in session? no
        //then why did u use session is wet hwis we will try running it ok
    connection.query(' update  '+course+' set Description=? where CO='+i,[desc] ,function(error, results, fields) {});
    }
    
});
module.exports=router;
