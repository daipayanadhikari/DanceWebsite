const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance')
};
const port = 8000;

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact= mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())//middleware To extract the data from the website to the app.js file
// Body-parser middleware
// app.use(express.json()) //For JSON requests
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = { 'title': "Nritiya Dance Academy", "content": con }
    res.status(200).render('home.pug', params);
});
// contact get request
app.get('/contact', (req, res) => {
    const params={ }
    res.status(200).render('contact.pug',params);
});
// contact post request
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    // var myData = JSON.parse(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    // myData.save();
    // myData.speak();
})
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});