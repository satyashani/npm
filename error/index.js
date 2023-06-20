/* * ************************************************************ 
 * Date: 18-Jun-2023
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Javascript file index.js 
 * *************************************************************** */

class JError extends Error {
    constructor(error) {
        super(error.text);
        this.code = error.code;
    }

    toJSON() {
        return { text: this.message, code: this.code };
    }
}

const fill = (text,params) => {
    var t = text + '';
    for (var k in params) {
        t = t.replace("%" + k + "%", params[k]);
    }
    return t;
};

const errors = {
    raise (error , params) {
        if(!error || !error.code || !error.text){
            return new JError({
                code : "invalid_error",
                text : "Invalid error, code or text missing"
            });
        }
        var e = {
            code : error.code,
            text : error.text
        };
        if(params){
            e.text = fill(error.text,params);
        }
        return new JError(e);
    }
};

module.exports = errors;



