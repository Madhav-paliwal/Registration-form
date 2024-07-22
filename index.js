var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended : true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error',()=>console.log("Error in connecting to databse"))
db.once('open',()=> console.log("Connected to database"))

app.post("/sign_up", (req, res)=>{
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phone = req.body.phone
    var gender = req.body.gender
    var password = req.body.password

    var data = {
        "name":name,
        "age":age,
        "email":email,
        "phone":phone,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted succesfully")
    })
    return res.redirect('signup_succes.html')
})


app.get("/", (req, res)=>{
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('indxe.html')
}).listen(3000);

console.log("Listening on port 3000")