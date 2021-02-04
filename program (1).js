'use strict';

// importing required libraries

const express = require('express');
const crypto = require("crypto");
const app = express();
const port = 3000;
var server = require("http").createServer(app);
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const fs = require("fs");

//var MongoClient = require('mongodb').MongoClient;
var DataSchema = new mongoose.Schema({  
    data : {
        type : Buffer
    }
  });
  
var DataCollection = mongoose.model('DataSchema', DataSchema);
const objectIdList = [];
const m = 500
const L = 5
const numebrOfIteration = 1000; // this denotes number of docuemts for 500 batch size
// Creates on randomly generated file
// const createFile = function(){
//     var wstream = fs.createWriteStream('myBinaryFile');
//     wstream.write(crypto.randomBytes(768*4 + (256*500*5)/8));
//     wstream.end();
//     console.log(crypto.randomBytes(768*4 + (256*500*5)/8))
//     return 
// }
// createFile()
// uses the createFile to generate a random file and store it to the database
const storeData = async function () {
    // Create the schema object
    const DataObject = new DataCollection({
        data: crypto.randomBytes(768*4 + (256*m*L)/8)
    });

    // Save the object to the daatbases
    let resposne = await DataObject.save()
        .catch(err => {
            console.log(err)
            console.log("Error in storing file");
            fs.writeFileSync("./hashmap.json",JSON.stringify({objectIds:objectIdList}));
            process.exit();
        });
    // add Key values to the list
    objectIdList.push((resposne._id).toString())
    return true
};

mongoose
    .connect("mongodb://localhost:27017/informationretrieval", { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("Database connected at port", process.env.APPLICATION_PORT);
        server.listen(process.env.APPLICATION_PORT, async function() {
            console.log(" Server Successfully Started ");
            let starttime = 0
            for(let i=0; i< numebrOfIteration; i++){
                starttime = Date.now();
                let res = await Promise.all([storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),
                    storeData(), storeData(), storeData(),storeData(),storeData(),storeData(), storeData(), storeData(),storeData(),storeData(),])
                    .catch((err) => {
                        console.log("error at ", err.message);
                    });
                console.log("Storing messages: ",i, i*500,"<<------", "time taken: ",Date.now()-starttime);
                
                if(i%20 == 0){
                    console.log("Now writing the maps to the files");
                    fs.writeFileSync("./hashmap.json",JSON.stringify({objectIds:objectIdList}));
                    // console.log("Files written", objectIdList.length);           
                }
            }
            console.log("Now writing the maps to the files");
            fs.writeFileSync("./hashmap.json",JSON.stringify({objectIds:objectIdList}));
            console.log("Files written",objectIdList.length);    
            process.exit();       
        });
        console.log("End of listeining")
    });
