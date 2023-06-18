# Hash Config

Hash your json configuration to a string that can be passed as environment variable safely along with
hash key.

**Hashing Algorithm** : "aes-192-cbc"

### Example

** Require **

```js
var hc = require("@smddev/hashconfig");
```

** Build Hash **

```js
// Build from json
var source = {
    key : "Value"
};

var hashedConfigString = hc.encode(source,"mysecret");

// Build from file
var hashedConfigString = hc.fromFile("path/to/json/file","mysecret");
```

** Load Environment Configuration **

```js
const hc = require("@smddev/hashconfig");

hc.load({
    keyvarname : "configkey", // Name of environment variable that contains hash key
    sourcevarname : "config"  // Name of environment variable that contains hashed config
});

const config = hc.get();
```