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
const { response } = require('express');
const { hrtime } = require('process');
//var MongoClient = require('mongodb').MongoClient;
var DataSchema = new mongoose.Schema({  
    data : {
        type : Buffer
    },
  });
  
var DataCollection = mongoose.model('DataSchema', DataSchema);

let objectIdOfFiles = [];
let len = 0;
const fetchfiles = async function (objectId) {
    //need to fetch the data from database
    try {
        const data = await DataCollection.find({ _id: ObjectId(objectId)});
        //console.log("Data is ",data)
        if (!data || data.length == 0)
            return false
        return (data[0].data.buffer);
    } catch (err) {
        console.log("Data not found in the database");
        return false
    }
};

// Creates on randomly generated file
const getRandomNumbers = function(numbers = 500){
    let listOfIndices = [];
    console.log("made random indice list of of length: ", numbers, " out off: ", len);
    for(let objects = 0; objects < numbers; objects++){
        listOfIndices.push( Math.floor(Math.random() * Math.floor(len)))
    }    
    return listOfIndices
}
mongoose
    .connect("mongodb://localhost:27017/informationretrieval", { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("Database connected");
        server.listen(process.env.APPLICATION_PORT, async function() {
            console.log(" Server Successfully Started ");
            // get the hash map to get all the ids
            objectIdOfFiles = await JSON.parse(fs.readFileSync("./hashmap.json"));
            objectIdOfFiles = objectIdOfFiles.objectIds;
            console.log(objectIdOfFiles.length)
            len = objectIdOfFiles.length;
            let totalTime = 0;
            let fileid = "";
            let hrTime = [];
            let starttime = 0;
            let endtime = 0;
            let x = "";
            for(let i=0; i< 1; i++){
                //let indiceList = getRandomNumbers(150);
                // let starttime = Date.now()
                //  let res = await Promise.all([
//  fetchfiles(objectIdOfFiles[indiceList[0]]), fetchfiles(objectIdOfFiles[indiceList[1]]), fetchfiles(objectIdOfFiles[indiceList[2]]), fetchfiles(objectIdOfFiles[indiceList[3]]), fetchfiles(objectIdOfFiles[indiceList[4]]), fetchfiles(objectIdOfFiles[indiceList[5]]), fetchfiles(objectIdOfFiles[indiceList[6]]), fetchfiles(objectIdOfFiles[indiceList[7]]), fetchfiles(objectIdOfFiles[indiceList[8]]), fetchfiles(objectIdOfFiles[indiceList[9]]), fetchfiles(objectIdOfFiles[indiceList[10]]), 
// fetchfiles(objectIdOfFiles[indiceList[11]]), fetchfiles(objectIdOfFiles[indiceList[12]]), fetchfiles(objectIdOfFiles[indiceList[13]]), fetchfiles(objectIdOfFiles[indiceList[14]]), fetchfiles(objectIdOfFiles[indiceList[15]]), fetchfiles(objectIdOfFiles[indiceList[16]]), fetchfiles(objectIdOfFiles[indiceList[17]]), fetchfiles(objectIdOfFiles[indiceList[18]]), fetchfiles(objectIdOfFiles[indiceList[19]]), fetchfiles(objectIdOfFiles[indiceList[20]]), 
// fetchfiles(objectIdOfFiles[indiceList[21]]), fetchfiles(objectIdOfFiles[indiceList[22]]), fetchfiles(objectIdOfFiles[indiceList[23]]), fetchfiles(objectIdOfFiles[indiceList[24]]), fetchfiles(objectIdOfFiles[indiceList[25]]), fetchfiles(objectIdOfFiles[indiceList[26]]), fetchfiles(objectIdOfFiles[indiceList[27]]), fetchfiles(objectIdOfFiles[indiceList[28]]), fetchfiles(objectIdOfFiles[indiceList[29]]), fetchfiles(objectIdOfFiles[indiceList[30]]), 
// fetchfiles(objectIdOfFiles[indiceList[31]]), fetchfiles(objectIdOfFiles[indiceList[32]]), fetchfiles(objectIdOfFiles[indiceList[33]]), fetchfiles(objectIdOfFiles[indiceList[34]]), fetchfiles(objectIdOfFiles[indiceList[35]]), fetchfiles(objectIdOfFiles[indiceList[36]]), fetchfiles(objectIdOfFiles[indiceList[37]]), fetchfiles(objectIdOfFiles[indiceList[38]]), fetchfiles(objectIdOfFiles[indiceList[39]]), fetchfiles(objectIdOfFiles[indiceList[40]]), 
// fetchfiles(objectIdOfFiles[indiceList[41]]), fetchfiles(objectIdOfFiles[indiceList[42]]), fetchfiles(objectIdOfFiles[indiceList[43]]), fetchfiles(objectIdOfFiles[indiceList[44]]), fetchfiles(objectIdOfFiles[indiceList[45]]), fetchfiles(objectIdOfFiles[indiceList[46]]), fetchfiles(objectIdOfFiles[indiceList[47]]), fetchfiles(objectIdOfFiles[indiceList[48]]), fetchfiles(objectIdOfFiles[indiceList[49]]), fetchfiles(objectIdOfFiles[indiceList[50]]), 
// fetchfiles(objectIdOfFiles[indiceList[51]]), fetchfiles(objectIdOfFiles[indiceList[52]]), fetchfiles(objectIdOfFiles[indiceList[53]]), fetchfiles(objectIdOfFiles[indiceList[54]]), fetchfiles(objectIdOfFiles[indiceList[55]]), fetchfiles(objectIdOfFiles[indiceList[56]]), fetchfiles(objectIdOfFiles[indiceList[57]]), fetchfiles(objectIdOfFiles[indiceList[58]]), fetchfiles(objectIdOfFiles[indiceList[59]]), fetchfiles(objectIdOfFiles[indiceList[60]]), 
// fetchfiles(objectIdOfFiles[indiceList[61]]), fetchfiles(objectIdOfFiles[indiceList[62]]), fetchfiles(objectIdOfFiles[indiceList[63]]), fetchfiles(objectIdOfFiles[indiceList[64]]), fetchfiles(objectIdOfFiles[indiceList[65]]), fetchfiles(objectIdOfFiles[indiceList[66]]), fetchfiles(objectIdOfFiles[indiceList[67]]), fetchfiles(objectIdOfFiles[indiceList[68]]), fetchfiles(objectIdOfFiles[indiceList[69]]), fetchfiles(objectIdOfFiles[indiceList[70]]), 
// fetchfiles(objectIdOfFiles[indiceList[71]]), fetchfiles(objectIdOfFiles[indiceList[72]]), fetchfiles(objectIdOfFiles[indiceList[73]]), fetchfiles(objectIdOfFiles[indiceList[74]]), fetchfiles(objectIdOfFiles[indiceList[75]]), fetchfiles(objectIdOfFiles[indiceList[76]]), fetchfiles(objectIdOfFiles[indiceList[77]]), fetchfiles(objectIdOfFiles[indiceList[78]]), fetchfiles(objectIdOfFiles[indiceList[79]]), fetchfiles(objectIdOfFiles[indiceList[80]]), 
// fetchfiles(objectIdOfFiles[indiceList[81]]), fetchfiles(objectIdOfFiles[indiceList[82]]), fetchfiles(objectIdOfFiles[indiceList[83]]), fetchfiles(objectIdOfFiles[indiceList[84]]), fetchfiles(objectIdOfFiles[indiceList[85]]), fetchfiles(objectIdOfFiles[indiceList[86]]), fetchfiles(objectIdOfFiles[indiceList[87]]), fetchfiles(objectIdOfFiles[indiceList[88]]), fetchfiles(objectIdOfFiles[indiceList[89]]), fetchfiles(objectIdOfFiles[indiceList[90]]), 
// fetchfiles(objectIdOfFiles[indiceList[91]]), fetchfiles(objectIdOfFiles[indiceList[92]]), fetchfiles(objectIdOfFiles[indiceList[93]]), fetchfiles(objectIdOfFiles[indiceList[94]]), fetchfiles(objectIdOfFiles[indiceList[95]]), fetchfiles(objectIdOfFiles[indiceList[96]]), fetchfiles(objectIdOfFiles[indiceList[97]]), fetchfiles(objectIdOfFiles[indiceList[98]]), fetchfiles(objectIdOfFiles[indiceList[99]]), fetchfiles(objectIdOfFiles[indiceList[100]]), 
// fetchfiles(objectIdOfFiles[indiceList[101]]), fetchfiles(objectIdOfFiles[indiceList[102]]), fetchfiles(objectIdOfFiles[indiceList[103]]), fetchfiles(objectIdOfFiles[indiceList[104]]), fetchfiles(objectIdOfFiles[indiceList[105]]), fetchfiles(objectIdOfFiles[indiceList[106]]), fetchfiles(objectIdOfFiles[indiceList[107]]), fetchfiles(objectIdOfFiles[indiceList[108]]), fetchfiles(objectIdOfFiles[indiceList[109]]), fetchfiles(objectIdOfFiles[indiceList[110]]), 
// fetchfiles(objectIdOfFiles[indiceList[111]]), fetchfiles(objectIdOfFiles[indiceList[112]]), fetchfiles(objectIdOfFiles[indiceList[113]]), fetchfiles(objectIdOfFiles[indiceList[114]]), fetchfiles(objectIdOfFiles[indiceList[115]]), fetchfiles(objectIdOfFiles[indiceList[116]]), fetchfiles(objectIdOfFiles[indiceList[117]]), fetchfiles(objectIdOfFiles[indiceList[118]]), fetchfiles(objectIdOfFiles[indiceList[119]]), fetchfiles(objectIdOfFiles[indiceList[120]]), 
// fetchfiles(objectIdOfFiles[indiceList[121]]), fetchfiles(objectIdOfFiles[indiceList[122]]), fetchfiles(objectIdOfFiles[indiceList[123]]), fetchfiles(objectIdOfFiles[indiceList[124]]), fetchfiles(objectIdOfFiles[indiceList[125]]), fetchfiles(objectIdOfFiles[indiceList[126]]), fetchfiles(objectIdOfFiles[indiceList[127]]), fetchfiles(objectIdOfFiles[indiceList[128]]), fetchfiles(objectIdOfFiles[indiceList[129]]), fetchfiles(objectIdOfFiles[indiceList[130]]), 
// fetchfiles(objectIdOfFiles[indiceList[131]]), fetchfiles(objectIdOfFiles[indiceList[132]]), fetchfiles(objectIdOfFiles[indiceList[133]]), fetchfiles(objectIdOfFiles[indiceList[134]]), fetchfiles(objectIdOfFiles[indiceList[135]]), fetchfiles(objectIdOfFiles[indiceList[136]]), fetchfiles(objectIdOfFiles[indiceList[137]]), fetchfiles(objectIdOfFiles[indiceList[138]]), fetchfiles(objectIdOfFiles[indiceList[139]]), fetchfiles(objectIdOfFiles[indiceList[140]]), 
// fetchfiles(objectIdOfFiles[indiceList[141]]), fetchfiles(objectIdOfFiles[indiceList[142]]), fetchfiles(objectIdOfFiles[indiceList[143]]), fetchfiles(objectIdOfFiles[indiceList[144]]), fetchfiles(objectIdOfFiles[indiceList[145]]), fetchfiles(objectIdOfFiles[indiceList[146]]), fetchfiles(objectIdOfFiles[indiceList[147]]), fetchfiles(objectIdOfFiles[indiceList[148]]), fetchfiles(objectIdOfFiles[indiceList[149]])//, fetchfiles(objectIdOfFiles[indiceList[150]]), 
// fetchfiles(objectIdOfFiles[indiceList[151]]), fetchfiles(objectIdOfFiles[indiceList[152]]), fetchfiles(objectIdOfFiles[indiceList[153]]), fetchfiles(objectIdOfFiles[indiceList[154]]), fetchfiles(objectIdOfFiles[indiceList[155]]), fetchfiles(objectIdOfFiles[indiceList[156]]), fetchfiles(objectIdOfFiles[indiceList[157]]), fetchfiles(objectIdOfFiles[indiceList[158]]), fetchfiles(objectIdOfFiles[indiceList[159]]), fetchfiles(objectIdOfFiles[indiceList[160]]), 
// fetchfiles(objectIdOfFiles[indiceList[161]]), fetchfiles(objectIdOfFiles[indiceList[162]]), fetchfiles(objectIdOfFiles[indiceList[163]]), fetchfiles(objectIdOfFiles[indiceList[164]]), fetchfiles(objectIdOfFiles[indiceList[165]]), fetchfiles(objectIdOfFiles[indiceList[166]]), fetchfiles(objectIdOfFiles[indiceList[167]]), fetchfiles(objectIdOfFiles[indiceList[168]]), fetchfiles(objectIdOfFiles[indiceList[169]]), fetchfiles(objectIdOfFiles[indiceList[170]]), 
// fetchfiles(objectIdOfFiles[indiceList[171]]), fetchfiles(objectIdOfFiles[indiceList[172]]), fetchfiles(objectIdOfFiles[indiceList[173]]), fetchfiles(objectIdOfFiles[indiceList[174]]), fetchfiles(objectIdOfFiles[indiceList[175]]), fetchfiles(objectIdOfFiles[indiceList[176]]), fetchfiles(objectIdOfFiles[indiceList[177]]), fetchfiles(objectIdOfFiles[indiceList[178]]), fetchfiles(objectIdOfFiles[indiceList[179]]), fetchfiles(objectIdOfFiles[indiceList[180]]), 
// fetchfiles(objectIdOfFiles[indiceList[181]]), fetchfiles(objectIdOfFiles[indiceList[182]]), fetchfiles(objectIdOfFiles[indiceList[183]]), fetchfiles(objectIdOfFiles[indiceList[184]]), fetchfiles(objectIdOfFiles[indiceList[185]]), fetchfiles(objectIdOfFiles[indiceList[186]]), fetchfiles(objectIdOfFiles[indiceList[187]]), fetchfiles(objectIdOfFiles[indiceList[188]]), fetchfiles(objectIdOfFiles[indiceList[189]]), fetchfiles(objectIdOfFiles[indiceList[190]]), 
// fetchfiles(objectIdOfFiles[indiceList[191]]), fetchfiles(objectIdOfFiles[indiceList[192]]), fetchfiles(objectIdOfFiles[indiceList[193]]), fetchfiles(objectIdOfFiles[indiceList[194]]), fetchfiles(objectIdOfFiles[indiceList[195]]), fetchfiles(objectIdOfFiles[indiceList[196]]), fetchfiles(objectIdOfFiles[indiceList[197]]), fetchfiles(objectIdOfFiles[indiceList[198]]), fetchfiles(objectIdOfFiles[indiceList[199]]), fetchfiles(objectIdOfFiles[indiceList[200]]), 
// fetchfiles(objectIdOfFiles[indiceList[201]]), fetchfiles(objectIdOfFiles[indiceList[202]]), fetchfiles(objectIdOfFiles[indiceList[203]]), fetchfiles(objectIdOfFiles[indiceList[204]]), fetchfiles(objectIdOfFiles[indiceList[205]]), fetchfiles(objectIdOfFiles[indiceList[206]]), fetchfiles(objectIdOfFiles[indiceList[207]]), fetchfiles(objectIdOfFiles[indiceList[208]]), fetchfiles(objectIdOfFiles[indiceList[209]]), fetchfiles(objectIdOfFiles[indiceList[210]]), 
// fetchfiles(objectIdOfFiles[indiceList[211]]), fetchfiles(objectIdOfFiles[indiceList[212]]), fetchfiles(objectIdOfFiles[indiceList[213]]), fetchfiles(objectIdOfFiles[indiceList[214]]), fetchfiles(objectIdOfFiles[indiceList[215]]), fetchfiles(objectIdOfFiles[indiceList[216]]), fetchfiles(objectIdOfFiles[indiceList[217]]), fetchfiles(objectIdOfFiles[indiceList[218]]), fetchfiles(objectIdOfFiles[indiceList[219]]), fetchfiles(objectIdOfFiles[indiceList[220]]), 
// fetchfiles(objectIdOfFiles[indiceList[221]]), fetchfiles(objectIdOfFiles[indiceList[222]]), fetchfiles(objectIdOfFiles[indiceList[223]]), fetchfiles(objectIdOfFiles[indiceList[224]]), fetchfiles(objectIdOfFiles[indiceList[225]]), fetchfiles(objectIdOfFiles[indiceList[226]]), fetchfiles(objectIdOfFiles[indiceList[227]]), fetchfiles(objectIdOfFiles[indiceList[228]]), fetchfiles(objectIdOfFiles[indiceList[229]]), fetchfiles(objectIdOfFiles[indiceList[230]]), 
// fetchfiles(objectIdOfFiles[indiceList[231]]), fetchfiles(objectIdOfFiles[indiceList[232]]), fetchfiles(objectIdOfFiles[indiceList[233]]), fetchfiles(objectIdOfFiles[indiceList[234]]), fetchfiles(objectIdOfFiles[indiceList[235]]), fetchfiles(objectIdOfFiles[indiceList[236]]), fetchfiles(objectIdOfFiles[indiceList[237]]), fetchfiles(objectIdOfFiles[indiceList[238]]), fetchfiles(objectIdOfFiles[indiceList[239]]), fetchfiles(objectIdOfFiles[indiceList[240]]), 
// fetchfiles(objectIdOfFiles[indiceList[241]]), fetchfiles(objectIdOfFiles[indiceList[242]]), fetchfiles(objectIdOfFiles[indiceList[243]]), fetchfiles(objectIdOfFiles[indiceList[244]]), fetchfiles(objectIdOfFiles[indiceList[245]]), fetchfiles(objectIdOfFiles[indiceList[246]]), fetchfiles(objectIdOfFiles[indiceList[247]]), fetchfiles(objectIdOfFiles[indiceList[248]]), fetchfiles(objectIdOfFiles[indiceList[249]]), fetchfiles(objectIdOfFiles[indiceList[250]]), 
// fetchfiles(objectIdOfFiles[indiceList[251]]), fetchfiles(objectIdOfFiles[indiceList[252]]), fetchfiles(objectIdOfFiles[indiceList[253]]), fetchfiles(objectIdOfFiles[indiceList[254]]), fetchfiles(objectIdOfFiles[indiceList[255]]), fetchfiles(objectIdOfFiles[indiceList[256]]), fetchfiles(objectIdOfFiles[indiceList[257]]), fetchfiles(objectIdOfFiles[indiceList[258]]), fetchfiles(objectIdOfFiles[indiceList[259]]), fetchfiles(objectIdOfFiles[indiceList[260]]), 
// fetchfiles(objectIdOfFiles[indiceList[261]]), fetchfiles(objectIdOfFiles[indiceList[262]]), fetchfiles(objectIdOfFiles[indiceList[263]]), fetchfiles(objectIdOfFiles[indiceList[264]]), fetchfiles(objectIdOfFiles[indiceList[265]]), fetchfiles(objectIdOfFiles[indiceList[266]]), fetchfiles(objectIdOfFiles[indiceList[267]]), fetchfiles(objectIdOfFiles[indiceList[268]]), fetchfiles(objectIdOfFiles[indiceList[269]]), fetchfiles(objectIdOfFiles[indiceList[270]]), 
// fetchfiles(objectIdOfFiles[indiceList[271]]), fetchfiles(objectIdOfFiles[indiceList[272]]), fetchfiles(objectIdOfFiles[indiceList[273]]), fetchfiles(objectIdOfFiles[indiceList[274]]), fetchfiles(objectIdOfFiles[indiceList[275]]), fetchfiles(objectIdOfFiles[indiceList[276]]), fetchfiles(objectIdOfFiles[indiceList[277]]), fetchfiles(objectIdOfFiles[indiceList[278]]), fetchfiles(objectIdOfFiles[indiceList[279]]), fetchfiles(objectIdOfFiles[indiceList[280]]), 
// fetchfiles(objectIdOfFiles[indiceList[281]]), fetchfiles(objectIdOfFiles[indiceList[282]]), fetchfiles(objectIdOfFiles[indiceList[283]]), fetchfiles(objectIdOfFiles[indiceList[284]]), fetchfiles(objectIdOfFiles[indiceList[285]]), fetchfiles(objectIdOfFiles[indiceList[286]]), fetchfiles(objectIdOfFiles[indiceList[287]]), fetchfiles(objectIdOfFiles[indiceList[288]]), fetchfiles(objectIdOfFiles[indiceList[289]]), fetchfiles(objectIdOfFiles[indiceList[290]]), 
// fetchfiles(objectIdOfFiles[indiceList[291]]), fetchfiles(objectIdOfFiles[indiceList[292]]), fetchfiles(objectIdOfFiles[indiceList[293]]), fetchfiles(objectIdOfFiles[indiceList[294]]), fetchfiles(objectIdOfFiles[indiceList[295]]), fetchfiles(objectIdOfFiles[indiceList[296]]), fetchfiles(objectIdOfFiles[indiceList[297]]), fetchfiles(objectIdOfFiles[indiceList[298]]), fetchfiles(objectIdOfFiles[indiceList[299]]), fetchfiles(objectIdOfFiles[indiceList[300]]), 
// fetchfiles(objectIdOfFiles[indiceList[301]]), fetchfiles(objectIdOfFiles[indiceList[302]]), fetchfiles(objectIdOfFiles[indiceList[303]]), fetchfiles(objectIdOfFiles[indiceList[304]]), fetchfiles(objectIdOfFiles[indiceList[305]]), fetchfiles(objectIdOfFiles[indiceList[306]]), fetchfiles(objectIdOfFiles[indiceList[307]]), fetchfiles(objectIdOfFiles[indiceList[308]]), fetchfiles(objectIdOfFiles[indiceList[309]]), fetchfiles(objectIdOfFiles[indiceList[310]]), 
// fetchfiles(objectIdOfFiles[indiceList[311]]), fetchfiles(objectIdOfFiles[indiceList[312]]), fetchfiles(objectIdOfFiles[indiceList[313]]), fetchfiles(objectIdOfFiles[indiceList[314]]), fetchfiles(objectIdOfFiles[indiceList[315]]), fetchfiles(objectIdOfFiles[indiceList[316]]), fetchfiles(objectIdOfFiles[indiceList[317]]), fetchfiles(objectIdOfFiles[indiceList[318]]), fetchfiles(objectIdOfFiles[indiceList[319]]), fetchfiles(objectIdOfFiles[indiceList[320]]), 
// fetchfiles(objectIdOfFiles[indiceList[321]]), fetchfiles(objectIdOfFiles[indiceList[322]]), fetchfiles(objectIdOfFiles[indiceList[323]]), fetchfiles(objectIdOfFiles[indiceList[324]]), fetchfiles(objectIdOfFiles[indiceList[325]]), fetchfiles(objectIdOfFiles[indiceList[326]]), fetchfiles(objectIdOfFiles[indiceList[327]]), fetchfiles(objectIdOfFiles[indiceList[328]]), fetchfiles(objectIdOfFiles[indiceList[329]]), fetchfiles(objectIdOfFiles[indiceList[330]]), 
// fetchfiles(objectIdOfFiles[indiceList[331]]), fetchfiles(objectIdOfFiles[indiceList[332]]), fetchfiles(objectIdOfFiles[indiceList[333]]), fetchfiles(objectIdOfFiles[indiceList[334]]), fetchfiles(objectIdOfFiles[indiceList[335]]), fetchfiles(objectIdOfFiles[indiceList[336]]), fetchfiles(objectIdOfFiles[indiceList[337]]), fetchfiles(objectIdOfFiles[indiceList[338]]), fetchfiles(objectIdOfFiles[indiceList[339]]), fetchfiles(objectIdOfFiles[indiceList[340]]), 
// fetchfiles(objectIdOfFiles[indiceList[341]]), fetchfiles(objectIdOfFiles[indiceList[342]]), fetchfiles(objectIdOfFiles[indiceList[343]]), fetchfiles(objectIdOfFiles[indiceList[344]]), fetchfiles(objectIdOfFiles[indiceList[345]]), fetchfiles(objectIdOfFiles[indiceList[346]]), fetchfiles(objectIdOfFiles[indiceList[347]]), fetchfiles(objectIdOfFiles[indiceList[348]]), fetchfiles(objectIdOfFiles[indiceList[349]]), fetchfiles(objectIdOfFiles[indiceList[350]]), 
// fetchfiles(objectIdOfFiles[indiceList[351]]), fetchfiles(objectIdOfFiles[indiceList[352]]), fetchfiles(objectIdOfFiles[indiceList[353]]), fetchfiles(objectIdOfFiles[indiceList[354]]), fetchfiles(objectIdOfFiles[indiceList[355]]), fetchfiles(objectIdOfFiles[indiceList[356]]), fetchfiles(objectIdOfFiles[indiceList[357]]), fetchfiles(objectIdOfFiles[indiceList[358]]), fetchfiles(objectIdOfFiles[indiceList[359]]), fetchfiles(objectIdOfFiles[indiceList[360]]), 
// fetchfiles(objectIdOfFiles[indiceList[361]]), fetchfiles(objectIdOfFiles[indiceList[362]]), fetchfiles(objectIdOfFiles[indiceList[363]]), fetchfiles(objectIdOfFiles[indiceList[364]]), fetchfiles(objectIdOfFiles[indiceList[365]]), fetchfiles(objectIdOfFiles[indiceList[366]]), fetchfiles(objectIdOfFiles[indiceList[367]]), fetchfiles(objectIdOfFiles[indiceList[368]]), fetchfiles(objectIdOfFiles[indiceList[369]]), fetchfiles(objectIdOfFiles[indiceList[370]]), 
// fetchfiles(objectIdOfFiles[indiceList[371]]), fetchfiles(objectIdOfFiles[indiceList[372]]), fetchfiles(objectIdOfFiles[indiceList[373]]), fetchfiles(objectIdOfFiles[indiceList[374]]), fetchfiles(objectIdOfFiles[indiceList[375]]), fetchfiles(objectIdOfFiles[indiceList[376]]), fetchfiles(objectIdOfFiles[indiceList[377]]), fetchfiles(objectIdOfFiles[indiceList[378]]), fetchfiles(objectIdOfFiles[indiceList[379]]), fetchfiles(objectIdOfFiles[indiceList[380]]), 
// fetchfiles(objectIdOfFiles[indiceList[381]]), fetchfiles(objectIdOfFiles[indiceList[382]]), fetchfiles(objectIdOfFiles[indiceList[383]]), fetchfiles(objectIdOfFiles[indiceList[384]]), fetchfiles(objectIdOfFiles[indiceList[385]]), fetchfiles(objectIdOfFiles[indiceList[386]]), fetchfiles(objectIdOfFiles[indiceList[387]]), fetchfiles(objectIdOfFiles[indiceList[388]]), fetchfiles(objectIdOfFiles[indiceList[389]]), fetchfiles(objectIdOfFiles[indiceList[390]]), 
// fetchfiles(objectIdOfFiles[indiceList[391]]), fetchfiles(objectIdOfFiles[indiceList[392]]), fetchfiles(objectIdOfFiles[indiceList[393]]), fetchfiles(objectIdOfFiles[indiceList[394]]), fetchfiles(objectIdOfFiles[indiceList[395]]), fetchfiles(objectIdOfFiles[indiceList[396]]), fetchfiles(objectIdOfFiles[indiceList[397]]), fetchfiles(objectIdOfFiles[indiceList[398]]), fetchfiles(objectIdOfFiles[indiceList[399]]), fetchfiles(objectIdOfFiles[indiceList[400]]), 
// fetchfiles(objectIdOfFiles[indiceList[401]]), fetchfiles(objectIdOfFiles[indiceList[402]]), fetchfiles(objectIdOfFiles[indiceList[403]]), fetchfiles(objectIdOfFiles[indiceList[404]]), fetchfiles(objectIdOfFiles[indiceList[405]]), fetchfiles(objectIdOfFiles[indiceList[406]]), fetchfiles(objectIdOfFiles[indiceList[407]]), fetchfiles(objectIdOfFiles[indiceList[408]]), fetchfiles(objectIdOfFiles[indiceList[409]]), fetchfiles(objectIdOfFiles[indiceList[410]]), 
// fetchfiles(objectIdOfFiles[indiceList[411]]), fetchfiles(objectIdOfFiles[indiceList[412]]), fetchfiles(objectIdOfFiles[indiceList[413]]), fetchfiles(objectIdOfFiles[indiceList[414]]), fetchfiles(objectIdOfFiles[indiceList[415]]), fetchfiles(objectIdOfFiles[indiceList[416]]), fetchfiles(objectIdOfFiles[indiceList[417]]), fetchfiles(objectIdOfFiles[indiceList[418]]), fetchfiles(objectIdOfFiles[indiceList[419]]), fetchfiles(objectIdOfFiles[indiceList[420]]), 
// fetchfiles(objectIdOfFiles[indiceList[421]]), fetchfiles(objectIdOfFiles[indiceList[422]]), fetchfiles(objectIdOfFiles[indiceList[423]]), fetchfiles(objectIdOfFiles[indiceList[424]]), fetchfiles(objectIdOfFiles[indiceList[425]]), fetchfiles(objectIdOfFiles[indiceList[426]]), fetchfiles(objectIdOfFiles[indiceList[427]]), fetchfiles(objectIdOfFiles[indiceList[428]]), fetchfiles(objectIdOfFiles[indiceList[429]]), fetchfiles(objectIdOfFiles[indiceList[430]]), 
// fetchfiles(objectIdOfFiles[indiceList[431]]), fetchfiles(objectIdOfFiles[indiceList[432]]), fetchfiles(objectIdOfFiles[indiceList[433]]), fetchfiles(objectIdOfFiles[indiceList[434]]), fetchfiles(objectIdOfFiles[indiceList[435]]), fetchfiles(objectIdOfFiles[indiceList[436]]), fetchfiles(objectIdOfFiles[indiceList[437]]), fetchfiles(objectIdOfFiles[indiceList[438]]), fetchfiles(objectIdOfFiles[indiceList[439]]), fetchfiles(objectIdOfFiles[indiceList[440]]), 
// fetchfiles(objectIdOfFiles[indiceList[441]]), fetchfiles(objectIdOfFiles[indiceList[442]]), fetchfiles(objectIdOfFiles[indiceList[443]]), fetchfiles(objectIdOfFiles[indiceList[444]]), fetchfiles(objectIdOfFiles[indiceList[445]]), fetchfiles(objectIdOfFiles[indiceList[446]]), fetchfiles(objectIdOfFiles[indiceList[447]]), fetchfiles(objectIdOfFiles[indiceList[448]]), fetchfiles(objectIdOfFiles[indiceList[449]]), fetchfiles(objectIdOfFiles[indiceList[450]]), 
// fetchfiles(objectIdOfFiles[indiceList[451]]), fetchfiles(objectIdOfFiles[indiceList[452]]), fetchfiles(objectIdOfFiles[indiceList[453]]), fetchfiles(objectIdOfFiles[indiceList[454]]), fetchfiles(objectIdOfFiles[indiceList[455]]), fetchfiles(objectIdOfFiles[indiceList[456]]), fetchfiles(objectIdOfFiles[indiceList[457]]), fetchfiles(objectIdOfFiles[indiceList[458]]), fetchfiles(objectIdOfFiles[indiceList[459]]), fetchfiles(objectIdOfFiles[indiceList[460]]), 
// fetchfiles(objectIdOfFiles[indiceList[461]]), fetchfiles(objectIdOfFiles[indiceList[462]]), fetchfiles(objectIdOfFiles[indiceList[463]]), fetchfiles(objectIdOfFiles[indiceList[464]]), fetchfiles(objectIdOfFiles[indiceList[465]]), fetchfiles(objectIdOfFiles[indiceList[466]]), fetchfiles(objectIdOfFiles[indiceList[467]]), fetchfiles(objectIdOfFiles[indiceList[468]]), fetchfiles(objectIdOfFiles[indiceList[469]]), fetchfiles(objectIdOfFiles[indiceList[470]]), 
// fetchfiles(objectIdOfFiles[indiceList[471]]), fetchfiles(objectIdOfFiles[indiceList[472]]), fetchfiles(objectIdOfFiles[indiceList[473]]), fetchfiles(objectIdOfFiles[indiceList[474]]), fetchfiles(objectIdOfFiles[indiceList[475]]), fetchfiles(objectIdOfFiles[indiceList[476]]), fetchfiles(objectIdOfFiles[indiceList[477]]), fetchfiles(objectIdOfFiles[indiceList[478]]), fetchfiles(objectIdOfFiles[indiceList[479]]), fetchfiles(objectIdOfFiles[indiceList[480]]), 
// fetchfiles(objectIdOfFiles[indiceList[481]]), fetchfiles(objectIdOfFiles[indiceList[482]]), fetchfiles(objectIdOfFiles[indiceList[483]]), fetchfiles(objectIdOfFiles[indiceList[484]]), fetchfiles(objectIdOfFiles[indiceList[485]]), fetchfiles(objectIdOfFiles[indiceList[486]]), fetchfiles(objectIdOfFiles[indiceList[487]]), fetchfiles(objectIdOfFiles[indiceList[488]]), fetchfiles(objectIdOfFiles[indiceList[489]]), fetchfiles(objectIdOfFiles[indiceList[490]]), 
// fetchfiles(objectIdOfFiles[indiceList[491]]), fetchfiles(objectIdOfFiles[indiceList[492]]), fetchfiles(objectIdOfFiles[indiceList[493]]), fetchfiles(objectIdOfFiles[indiceList[494]]), fetchfiles(objectIdOfFiles[indiceList[495]]), fetchfiles(objectIdOfFiles[indiceList[496]]), fetchfiles(objectIdOfFiles[indiceList[497]]), fetchfiles(objectIdOfFiles[indiceList[498]]), fetchfiles(objectIdOfFiles[indiceList[499]]), 
                //  ]).catch((err) => {
                //         console.log("error at ", err.message);
                //     });
                fileid = objectIdOfFiles[Math.floor(Math.random() * Math.floor(len))];
                // Get the start time
                hrTime = process.hrtime();
                starttime = hrTime[0]*1000000000+hrTime[1] //nanoseconds
                // got the start time
                x= await fetchfiles(fileid);
                // Get the end time
                hrTime = process.hrtime();
                endtime = hrTime[0]*1000000000+hrTime[1];
                console.log(starttime);
                console.log(endtime);
                // got the end time
                totalTime += endtime - starttime ;
                console.log("Iterataion ", i," : Files fetched in time: ",(endtime - starttime)," total time: ",totalTime, " average time: ",totalTime/(i+1));
                //console.log("Iteration: ",i," One object Id to check every iteration ",objectIdOfFiles[indiceList[0]]);
                console.log("Iteration: ",i," One object Id to check every iteration ",x);
                console.log("File Id is :", fileid);
            }
            process.exit();       
        });
    });