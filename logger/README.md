# Logger

Get quick logger for your project.

**Log Levels Supported**
* Error : 0
* Warning : 1
* Notice : 2
* Action : 3
* Info : 4
* Debug : 5

When log level is set to n, the messages at or below that level will be logger. E.g. setting log level
to `Error` will log only `Error` messages.

### Example

**Require**

```js
var xlog = require("@smddev/logger");
```

**Get Logger**

```js
var logger = xlog.logger(xlog.levels.info);
```

**Logging**

```js
logger.error(New Error("Test Error"), "Message");
logger.warning("Heading","Message");
```