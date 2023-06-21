/* * ************************************************************ 
 * Date: 18-Jun-2023
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Javascript file test.js 
 * *************************************************************** */

const assert = require("assert");
const error = require("./index");

const codes = [
    { code : "notfound" , text : "Item was not found" },
    { code : "unauth"   , text : "Access unauthorised"},
    { code : "servererror" , text : "Server error %message%" }
];

try{
    error.declare();
}catch(e){
    assert.equal(e.code , "invalid_error");
}

try{
    error.declare(null);
}catch(e){
    assert.equal(e.code , "invalid_error");
}

try{
    error.declare('');
}catch(e){
    assert.equal(e.code , "invalid_error");
}

try{
    error.declare(0);
}catch(e){
    assert.equal(e.code , "invalid_error");
}

codes.forEach((c) => {
    error.declare(c.code,c.text);
});

// Get error object 
var errors = error.get();

// Raise Error
try{
    throw error.raise(errors.notfound);
}catch(e){
    assert.equal(e.code , codes[0].code);
}
try{
    throw error.raise(errors.servererror , { message : "Memory overload" });
}catch(e){
    assert.equal(e.message , "Server error Memory overload");
}

// Convert to JSON
var f =  () => {
    throw error.raise(errors.notfound);
};

try {
    f();
}catch(e) {
    var j = e.toJSON();
    assert.equal(j.code , codes[0].code);
    assert.equal(j.text , codes[0].text);
};