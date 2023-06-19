# Logger

Get quick logger for your project.

**Log Levels Supported**
* Error
* Warning
* Notice
* Action
* Info
* Debug

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