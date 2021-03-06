var express = require("express")
var app = express()

// Body parser for forms
var bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


Beavers = [{id:0, name:"Julia"}, {id:1, name: "Sam"}, {id:2, name: "patty"}]
// Schema => ["id", "name"]

Relations = [{id:0, b1id:0, b2id:1}, {id:1, b1id:2, b2id:0}]
// Schema => ["record id", "first beaver's id", "second beaver's id"]

app.get("/home", function(req, res){
    res.send(Beavers)
})

// Beaver CRUD routes  --------------------------


// Relations CRUD routes -------------------------------------
app.get("/relations", function(req, res){
    res.send('put a new relationship in the body and submit')
})

app.post("/relations", function(req, res){
    var newId = Relations.length;
    var newB1 = req.body.bid1;
    var newB2 = req.body.bid2;
    var newRelation = {id: newId, b1id: newB1, b2id: newB2};
    Relations.push(newRelation);
    res.redirect("/relations/" + newId)
})

app.get("/relations/:id", function(req, res){
    var relationId = req.params.id
    res.send(Relations[relationId]);
})

app.get("/relations/:id/update", function(req, res){
    var relationId = req.params.id
    res.send({relation: Relations[relationId], message: 'modify this relationship in the body'});
})

app.post("/relations/:id/update", function(req, res){
    var relationId = req.params.id
    Relations[relationId].name = req.body.name
    res.redirect("/relations/" + relationId)
})

app.get("/relations/:id/delete", function(req, res){
    var relationId = req.params.id
    res.send({id: relationId, message: 'confirm deleting this relation'});
})

app.post("/relations/:id/delete", function(req, res){
    // write the code to delete the selected relationship
    res.redirect("/")
})

app.listen(3001, function() {
    console.log("litening in port 3001")
})




