var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var async = require('async');
var cs=require('./route/cs');
var int_ss=require('./route/int_ss');
var ext_ss=require('./route/ext_ss');
var quiz_ss=require('./route/quiz_ss');
var co_=require('./route/courses');
var ce_=require('./route/callexcel');
var demo=require('./route/demo');
var demo1=require('./route/demo1');
var demo2=require('./route/demo2');
var read_frm_xl=require('./route/read_frm_xl');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project'
});
var app = express();
app.set('view engine', 'ejs'); 
//
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static("./images"));
app.use(express.static("./css"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/files',express.static('./files'));
app.get('/', function(request, response) {
     
    response.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/int_ss',int_ss);
app.use('/courses',co_);
app.use('/callexcel',ce_);
//we will try? yes
app.use('/ext_ss',ext_ss);
app.use('/read_frm_xl',read_frm_xl);
//app.use('/edit',edit);
//app.use('/edit_marks ',em);
app.use('/QandAssign',quiz_ss);
//app.use('/disp_questions',dq);

app.use('/demo',demo);
app.use('/demo1',demo1);
app.use('/demo2',demo2);//is this enough? yes
//app.use('/storeCO',sc);//now we can execute ok
app.use('/cs',cs);
app.get('/set_date', function(request, response) {
        response.render('set_date');//why isnt datetime having calendar or something yes even i thought tat
        //maybe datetime doesnt exust
        response.end();
    });
//});//why do we have an error here? im checing that 
app.get('/h', function(request, response) {
    var username=request.session.username;
    connection.query('SELECT course FROM courses WHERE Name=?', [username], function(error, results, fields) {
        let arr=[];
        let i=0;
        while(i<results.length)
        {
            arr[i]=results[i].course;
            i++;
        }
        var data={uname:username,name:arr};
        response.render('index', {data:data});
        response.end();
    });
});
app.post('/auth', function(request, response) {//shall e directly give /auth? 
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM userinfo WHERE Name = ? AND Password = ?', [username, password], function(error, results, fields) {
if(error){
    console.log(error);
    return;
}
//when can we extrct sysdate anywhere we can
            if (results.length > 0) {
                
                request.session.loggedin = true;
                request.session.username = username;
                if(username=="admin")
                response.redirect('/set_date');//we will create a page to set date and time? ok ejs? yes
                else
                response.redirect('/h');//if it is admin we will redirect ok this way maybe we can
                //i thougth we will read val in a separate page and then redirect it and do remaining cal in int_ss
                //maybe it will work we will try and see ok
                //did u write ml assign? i dont know anything in thag i will see at night i found 2nd ans half in internet
                //i got full i thikn 2nd ans i will see and let u know ok
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.listen(8000,function(){
    console.log("Running");
});
module.exports = app;