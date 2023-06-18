/* * ************************************************************ 
 * Date: 18-Jun-2023
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Javascript file test.js 
 * *************************************************************** */

const assert = require("assert");
const hasher = require("./index");

//exports.fromFile = fromFile;

var source = {
    key : "Value"
};

var key = "test";
var hashed = hasher.encode(JSON.stringify(source),key);
var hash = "43ffd3835967efdf38c4bacce90a6288";

assert.equal(hashed , hash, 'Encode test failed');

process.env.source = hashed;
process.env.key = key;

hasher.load({
    keyvarname : "key",
    sourcevarname : "source"
});

var conf = hasher.get();

assert.equal(conf.key , source.key, 'Load test failed');

var fhashed = hasher.fromFile("./testconf.json", key);
var fhash = '3f3ed8148680f8458128da626c3bc984d2768327291f1df4e2d4fff91380f514';
assert.equal(fhashed , fhash, 'Encode test failed');

process.env.source = fhashed;
process.env.key = key;

hasher.load({
    keyvarname : "key",
    sourcevarname : "source"
});

var fconf = hasher.get();
assert.equal(fconf.key , source.key, 'Load test failed');