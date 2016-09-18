var express=require( 'express' );
var app=express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3000;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/Weekend_Challange_04';


// static public folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base
app.get( '/', function( req, res ){
  console.log( 'base URL hit' );
  res.sendFile( 'public/index.html' );
}); // end base url


////////////////////get tasks already in DB//////////////////////////////
app.get('/getTasks', function(req,res){
  console.log('in getTasks app.get');
  pg.connect(connectionString, function(err, client, done) {
    if(err){
      console.log(err);
    } else {
      var tasksToGet = [];
      var queryResults = client.query('SELECT task_name, task_description, task_completed, date(task_start), cast(task_start as time) FROM tasks');
      console.log(queryResults);
      queryResults.on('row', function(row){
        tasksToGet.push(row);
      }); //end queryResults
      console.log('tasksToGet:', tasksToGet[0]);
      queryResults.on('end',function(){
        done();
        return res.json(tasksToGet);
      });
    }//end else
  });//end pg.connect
});//end app.get for getTasks


////////////////////add new tasks to DB//////////////////////////////
app.post('/newTaskFromClient', urlencodedParser, function (req, res) {
  console.log('in .post newTaskFromClient');
  console.log('req.body', req.body);
  //create variables from req
  var taskName = req.body.taskName;
  var taskDescription = req.body.taskDescription;
  var taskCompleted = false;
  var taskStart = 'now()';
  console.log(taskName, taskDescription);
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else {
      console.log('connected to Weekend_Challange_04 DB');
      client.query('INSERT INTO tasks(task_name, task_description, task_completed, task_start) VALUES($1, $2, $3, $4)', [taskName, taskDescription, taskCompleted, taskStart]);
      res.send({success: true});
    }//end else
  });//end pg connect
});//end app.post
