
const http = require('http');
const fs=require('fs');
const hfile=fs.readFileSync("home.html","utf-8");
function replace(hfile,value){
    hfile=hfile.replace("{%city%}",value.name);
    hfile=hfile.replace("{%country%}",value.sys.country);
    hfile=hfile.replace("{%temp%}",value.main.temp);
    hfile=hfile.replace("{%min%}",value.main.temp_min);
    hfile=hfile.replace("{%max%}",value.main.temp_max);

    return hfile;
};
'use strict';

var requests = require('requests');
const server = http.createServer();
server.on('request', (req,res) => {
 let city="delhi";
        const orurl=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d5fb326d5e772e0657400e59846693a6`;
        requests(orurl)
            .on('data', (data) => {
              //  console.log(data);
                const ordata=[JSON.parse(data)];
              //  console.log(ordata);
              const ordata1=ordata.map((val)=> replace(hfile,val)).join("");

               res.write(ordata1);
             // console.log(ordata1);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
res.end();
                
            });
    
});



server.listen(8000, '127.0.0.1', (err) => {
    if (err) console.log(err);
    console.log("server running");
});