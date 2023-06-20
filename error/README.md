# Error Generator

* Generate node.js errors in a format exportable to json
* Automatically insert parameters

## Methods

### raise(error , [params])
Raise an error, replace any parameters with parameters in the `params` object.

### declare(code , [text])
Declare an error, code must but a string that could be used as an object key. 
text is same as code if not provided.

### get()
Get the object of declared errors. Object keys are declared codes.

### Example

```js
// Require
const error = require("@smddev/error");

// Declare Errors
error.declare({ code : "notfound" , text : "Item was not found" });
error.declare({ code : "unauth"   , text : "Access unauthorised"});
error.declare({ code : "servererror" , text : "Server error %message%" });

// Get declared errors object
var errors = error.get();

// Raise Error
error.raise(errors.notfound);
error.raise(errors.servererror , { message : "Memory overload" });

// Convert to JSON
var f =  () => {
    throw error.raise(errors.notfound);
};

try {
    f();
}catch(e) {
    console.log(e.toJSON()); // Logs - "{ text: 'Item was not found', code: 'notfound' }"
};

```
