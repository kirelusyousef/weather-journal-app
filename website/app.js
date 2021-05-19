/* Global Variables */

let d = new Date();
let d_month=d.getMonth()+1;//edit month
let newDate = d.getDate()+'/'+ d_month +'/'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=1ef1d221f29fff72437b44937ea8aaa1&units=metric';

//get element from index.html
const ZCElement = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

/* Function called by event listener */
//on click Generate
document.getElementById('generate').addEventListener('click', ()=>{
//catch value of zip code
const ZC_val = ZCElement.value;
//catch value of feeling 
const feel_val= feelings.value;

//send data to function get_data
get_data(baseURL,ZC_val,apiKey) 

.then(function(data){
console.log(data);

//send data to function post_data
post_data('/data',{
  date:newDate,
  temp:data.list[0].main.temp,
  content:feel_val
})
// send data to function update_ul
update_UI();
});
});

/* Function to GET Web API Data*/
// function get_data
const get_data = async(baseURL,zip,key)=>{
const res_get =  await fetch(baseURL+zip+key)
try {
const data= await res_get.json();
return data ;
}
catch(error){
console.log("error",error);

}
}

/* Function to POST data */
// function post_data
const post_data = async(url='',data={})=>{
  console.log(data);
  const res_post = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
 // Body data type must match "Content-Type" header        
  body: JSON.stringify(data), 
});

try {
const new_data= await res_post.json();
console.log(new_data);
return new_data ;
}
catch(error){
console.log("error",error);

}
}


/* Function to GET Project Data */
//function update_UI
const update_UI = async()=>{

const req =await fetch ('/all')
try {
const all_data= await req.json();

date.innerHTML = `Date : ` + all_data.date;
temp.innerHTML = `Tempratuer : `+ all_data.temp +` °C`;
content.innerHTML = `Feeling : `+ all_data.content;

}
catch(error){
console.log("error",error);
}
}

//validation  form
function validate() {
  const x = ZCElement.value;
  const y = feelings.value;
  if ( x==""&&y=="" ) {
    //validation message
    document.getElementById("msgzip").innerHTML = '**Must be written Zip code';
    document.getElementById("msgfeeling").innerHTML = '**Tell us how you feel now?';
  return false;
    }else if(x==""&&y!=""){
      document.getElementById("msgzip").innerHTML = '**Must be written Zip code';
    }else if(x!=""&&y==""){
      document.getElementById("msgfeeling").innerHTML = '**Tell us how you feel now?';
      }
    
    else {return true;}

}
//delet validation message 
function zipFun(a) {
  const x = ZCElement.value;
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
if ( x!=""){
if(x.match(isValidZip)){
  document.getElementById("msgzip").innerHTML = '';
}else{
  document.getElementById("msgzip").innerHTML = '** uncorrect zip code';
}
}}
function feelFun(b) {
  const y = feelings.value;
if ( y!=""){
document.getElementById("msgfeeling").innerHTML = '';
}}