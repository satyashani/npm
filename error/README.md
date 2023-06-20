# Error Generator

* Generate node.js errors in a format exportable to json
* Automatically insert parameters

### Example

```js
// Require
const error = require("@smddev/error");

// Declare Errors
const codes = [
    { code : "notfound" , text : "Item was not found" },
    { code : "unauth"   , text : "Access unauthorised"},
    { code : "servererror" , text : "Server error %message%" }
];

// Raise Error
error.raise(codes[0]);
error.raise(codes[2] , { message : "Memory overload" });

// Convert to JSON
var f =  () => {
    throw error.raise(codes[0]);
};

try {
    f();
}catch(e) {
    console.log(e.toJSON()); // Logs - "{ text: 'Item was not found', code: 'notfound' }"
};

```
