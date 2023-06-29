/* * ************************************************************ 
 * Date: 18-Jun-2023
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Javascript file index.js 
 * *************************************************************** */

const logTypes = {
    error: 0,
    warning: 1,
    notice: 2,
    action: 3,
    info: 4,
    debug: 5
};

const logTexts = {
    error: "ERROR",
    warning: "WARNING",
    notice: "NOTICE",
    action: "ACTION",
    info: "INFO",
    debug: "DEBUG"
};

var consoleLog = function (type, log) {
    var d = new Date();
    if (type !== "error") {
        console.log(d.toISOString(), logTexts[type], log);
    } else {
        console.error(d.toISOString(), logTexts[type], log);
    }
};

var joinArgs = function (argv, starting) {
    var t = "",
        i = starting || 0;
    for (i; i < argv.length; i++){
        if(argv[i] && argv[i].toString && typeof argv[i].toString === 'function'){
            t += " " + argv[i].toString();
        }else{
            t += " " + argv[i];
        }
    }
    return t;
};

class xlog {
    level = logTypes.info;
    
    constructor (level) {
        if(level !== null){
            this.level = level;
        }
    }
    /**
     *
     * @param {Error | String} err
     * @param {String} message
     * @param {Boolean} logstack
     */
    error (err, message, logstack) {
        var e = err && err.message ? err.message : err;
        e += " " + message || "";
        e += logstack && err && err.stack ? err.stack : "";
        consoleLog("error", e + " " + joinArgs(arguments, 2));
    }
    warning () {
        if (this.level >= logTypes.warning)
            consoleLog("warning", joinArgs(arguments, 0));
    }
    action () {
        if (this.level >= logTypes.action)
            consoleLog("action", joinArgs(arguments, 0));
    }
    info () {
        if (this.level >= logTypes.info)
            consoleLog("info", joinArgs(arguments, 0));
    }
    debug  () {
        if (this.level >= logTypes.debug)
            consoleLog("debug", joinArgs(arguments, 0));
    }
};

exports.levels = logTypes;
exports.logger = ( level ) => {
    return new xlog(level);
};


