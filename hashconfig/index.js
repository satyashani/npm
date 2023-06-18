/* * ************************************************************ 
 * Date: 18-Jun-2023
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Javascript file index.js 
 * *************************************************************** */


const process = require("process");
const crypto = require("crypto");
const fs = require("fs");

const cwd = process.cwd();
const algorithm = "aes-192-cbc";
const iv = Buffer.alloc(16, 0);

var config = null;

var keyvarname = 'configkey';
var sourcevarname = 'config';

const getKey = () => {
    if (!process.env[keyvarname]) {
        throw new Error("Value '"+keyvarname+"' not set in environment");
    }
    return process.env[keyvarname];
};

const getSource = () => {
    if (!process.env[sourcevarname]) {
        throw new Error("Value '"+sourcevarname+"' not set in environment");
    }
    return process.env[sourcevarname];
};

const enc = function (json , key) {
    if(!key){
        key = getKey();
    }
    var ckey = crypto.scryptSync(key, "GfG", 24);
    var cipher = crypto.createCipheriv(algorithm, ckey, iv);
    return cipher.update(json, "utf8", "hex") + cipher.final("hex");
};

const fromFile = (file,key) => {
    if(!key){
        key = getKey();
    }
    var t = fs.readFileSync(file,{ encoding : 'utf8' });
    if(!t){
        throw new Error("Source could not be read");
    }
    return enc(t,key);
};

const dec = function (params) {
    if(params){
        if(params.keyvarname){
            keyvarname = params.keyvarname;
        }
        if(params.sourcevarname){
            sourcevarname = params.sourcevarname;
        }
    }
    var source = getSource();
    var key = getKey();
    const dkey = crypto.scryptSync(key, "GfG", 24);
    
    var decipher = crypto.createDecipheriv(algorithm, dkey, iv);
    var text = decipher.update(source, "hex", "utf8") + decipher.final("utf8");
    if (!text) {
        throw new Error("Failed to load config");
    }
    config = JSON.parse(text);
    if (typeof config !== "object") {
        throw new Error("Config could not be read");
    }
};

const get = function () {
    if (!config) {
        dec();
    }
    return config;
};

exports.encode = enc;
exports.fromFile = fromFile;
exports.get = get;
exports.load = dec;

if (process.argv[2] === "-d") {
    console.log(JSON.stringify(get(),0,2));
}
if (process.argv[2] === "-e" && process.argv[3]) {
    enc(process.argv[3]);
}