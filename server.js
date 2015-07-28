'use strict';

/*
var cl = console.log;
console.log = function(){
  console.trace();
  cl.apply(console,arguments);
};
*/

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//mongoose.connect('mongodb://localhost/contactList');
mongoose.connect('mongodb://Elan:contactlist@ds027483.mongolab.com:27483/contactlist');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("contactList db opened");
});


/*var messageSchema = new Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema, 'messages');
var mongoMessage;

/!*Message.findOne().exec(function (err, messageDoc){
    mongoMessage = messageDoc.message;
});*!/

app.get('*', function(req, res){
    console.log("I received request for HTML")
    Message.find({}, function(err, docs){
        mongoMessage = docs.message ;

        console.log(mongoMessage);
        res.json(docs);
});
    });*/
/*
mongoose.model('contact', new Schema({
    name: String,
    email: String,
    number: String
}), 'contactList');

var contacts = mongoose.model('contact');*/
//contacts.find({}, function(err, data){console.log(err, data, data.length)});

var contactListSchema = new Schema({
    name: String,
    email: String,
    number: String
});

var Contacts = mongoose.model('Contacts', contactListSchema, 'contactList');

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

app.get('/contactList', function(req, res) {

    console.log("I received GET request")
    Contacts.find({}, function (err, docs) {
        console.log(docs);
        res.json(docs);

    });

});
app.post('/contactList', function(req, res){
    var newContacts = new Contacts({
        name: req.body.name,
        email:req.body.email,
        number:req.body.number
    });
    console.log(req.body);
    newContacts.save( function(err, docs){
        res.json(docs);
    });
});


       /* app.delete('/contactList/:id', function(req, res) {
            Contacts.remove({
                _id : req.params.id
            }, function(err, docs) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
               // Todo.find(function(err, docs) {
                    if (err)
                        res.send(err)
                    res.json(docs);
                });
            });
        });*/

        /*
        //Temporary data stored in the server

        var person1 = {
             name: 'Elan',
             email: '@gnail',
             number: '111-1111'
         };

         var person2 = {
             name: 'Sathish',
             email: '@yahoo',
             number: '222-1111'
         };

         var person3 = {
             name: 'Theeran',
             email: '@outlook',
             number: '333-1111'
         };
         var contactList = [person1, person2, person3];
         res.json(contactList);*/

/*
//Just to check if the server is responding properly
app.get('/', function(req, res){
    res.send("Hello world from server");

});*/

var port = process.env.PORT || 3030;
app.listen(port);
console.log("Server remaining on port 3030");

/* Requires meanio .
var mean = require('meanio');
var cluster = require('cluster');


// Code to run if we're in the master process or if we are not in debug mode/ running tests

if ((cluster.isMaster) &&
  (process.execArgv.indexOf('--debug') < 0) &&
  (process.env.NODE_ENV!=='test') && (process.env.NODE_ENV!=='development') &&
  (process.execArgv.indexOf('--singleProcess')<0)) {
//if (cluster.isMaster) {

    console.log('for real!');
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        console.log ('forking ',i);
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {

    var workerId = 0;
    if (!cluster.isMaster)
    {
        workerId = cluster.worker.id;
    }
//Creates and serves mean application
    mean.serve({ workerid: workerId /* more options placeholder
}, function (app) {
      var config = app.config.clean;
        var port = config.https && config.https.port ? config.https.port : config.http.port;
        console.log('Mean app started on port ' + port + ' (' + process.env.NODE_ENV + ') cluster.worker.id:', workerId);
    });
}
*/