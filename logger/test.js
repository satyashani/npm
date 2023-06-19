/* * ************************************************************ 
 * Date: 18-Jun-2023
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Javascript file test.js 
 * *************************************************************** */

const assert = require("assert");
const xlog = require("./index");

var levels = xlog.levels;

assert.equal(0 , levels.error, 'Level check failed');
assert.equal(4 , levels.info, 'Level check failed');

var logger = xlog.logger(levels.info);

logger.error(new Error("Test error"),"sample error");
logger.info("Heading","Subject");
logger.warning("Heading","Warning log");