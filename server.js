// Setup empty JS object to act as endpoint for all routes
projectData = {};
// TODO-Express to run server and routes
// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start exoress with app
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static('website'));


// Setup Server
const port = 8888;

const server = app.listen(port, ()=>{
console.log(`server running`)
// url of localhost
console.log(`running on : http://127.0.0.1:${port}`)
})

// get data from server
app.get('/all',(request,response)=>{
response.send(projectData); 

});

// post data to server
app.post('/data',(request,response)=>{

projectData={

temp:request.body.temp,
date:request.body.date,
content:request.body.content
};
//projectData.push(newEntry);
});