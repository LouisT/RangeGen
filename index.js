/*
  RangeGen - Node.js & Browser
  By Louis T. <louist@ltdev.im>
  https://github.com/LouisT/RangeGen/
*/
(function(Setup){
   var RangeGen = function (from, to, step, error, cb) {
            var range = [],
                invalid = RangeGen.validate(from,to),
                cb = cb||function(x){return x};
            if (invalid) {
               return cb(RangeGen.handleError(invalid,error));
            };
            var calc = RangeGen.calculate(from,to,step,2);
            while (--calc["loops"]) {
                range.push(RangeGen.enc(calc["from"],calc["lcase"]));
                calc["from"] += calc["incr"];
            };
            // Return an error if no range is made.
            // This should NOT happen, but error if it does!
            return cb((!!(range.length)?range:RangeGen.handleError(RangeGen.Errors("NotGenerated"),error)));
   };
   RangeGen.validate = function (from, to, str) {
            var isValid = function (str) {
                return (typeof(str) !== "undefined" && str !== null && /^[a-z]+$|^[+-]?(\d*\.)?\d+$/i.test(str));
            };
            if ((isValid(from) && isValid(to) && (!str || isValid(str)))) {
               if ((isNaN(from) || isNaN(to)) || (str && isNaN(str))) {
                  if (!isNaN(from)) {
                     return RangeGen.Errors("InvalidFrom");
                  };
                  if (!isNaN(to)) {
                     return RangeGen.Errors("InvalidTo");
                  };
                  if (str && !isNaN(str)) {
                     return RangeGen.Errors("InvalidStr");
                  };
               };
               return false;
            }
            return RangeGen.Errors("InvalidInput");
   };
   RangeGen.getNum = function (input) {
            if (!isNaN(input)) {
               return Number(input);
            };
            return Number(RangeGen.dec(input));
   };
   RangeGen.byIndex = function (num, from, to, step, error, cb) {
            var invalid = RangeGen.validate(from,to),
                cb = cb||function(x){return x};
            if (invalid) {
               return cb(RangeGen.handleError(invalid,error));
            };
            var calc = RangeGen.calculate(from,to,step,2),
                added = calc["from"]+(calc["incr"]*num),
                ret = (added<=calc["to"]?RangeGen.enc(added,calc["lcase"]):false);
            return cb((ret?ret:RangeGen.handleError(RangeGen.Errors("NotGenerated"),error,1)));
   };
   RangeGen.byValue = function (str, from, to, step, error, cb) {
            var invalid = RangeGen.validate(from,to,str),
                cb = cb||function(x){return x};
            if (invalid) {
               return cb(RangeGen.handleError(invalid,error,1));
            };
            var step = RangeGen.getStep(step),
                index = Math.floor(RangeGen.getNum(str)/step);
            return cb((RangeGen.byIndex(index, from, to, step, error) === str?index:false));
   };
   RangeGen.inRange = function (str, from, to, step, error, cb) {
            var cb = cb||function(x){return x};
            return cb(!!RangeGen.byValue(str,from,to,step,error));
   };
   RangeGen.enc = function (num, lcase) {
            if (lcase == null) {
               return Number(num);
            };
            var str = "";
            while (num >= 0) {
                  str = String.fromCharCode(65+num%26)+str;
                  num = (num-(num%26))/26-1;
            };
            return (lcase?str:str.toLowerCase());
   };
   RangeGen.dec = function (str) {
            var num = 0;
            for (var i = 0, l = str.length; i != l; ++i) {
                num = num*26+(str.charCodeAt(i)|0x20)-96;
            };
            return num-1;
   };
   RangeGen.getStep = function (step) {
            return (isNaN(step)||0>=step?1:step);
   };
   RangeGen.calculate = function (from, to, step, ext) {
            var lcase = (isNaN(from)?(from==from.toUpperCase()):null),
                from = RangeGen.getNum(from),
                to = RangeGen.getNum(to),
                direction = !(from>to),
                start = (direction?from:to),
                end = (direction?to:from),
                step = RangeGen.getStep(step);
            return {
                lcase: lcase,
                from: from,
                to: to,
                incr: (direction?step:-step),
                loops: Math.floor((end-start)/step+ext),
            };
   };
   RangeGen.addPro = RangeGen.addPrototype = function () {
            String.prototype.range = function (step, error, cb) {
                   var res = this.match(/^([a-z]+|[+-]?(?:\d*\.)?\d+)\.{2}([a-z]+|[+-]?(?:\d*\.)?\d+)$/i),
                       cb = cb||function(x){return x};
                   if (res) {
                      var invalid = RangeGen.validate(res[1],res[2]);
                      if (invalid) {
                         return cb(RangeGen.handleError(invalid,error));
                      };
                      return RangeGen(res[1],res[2],step,error,cb);
                   };
                   return cb(RangeGen.handleError(RangeGen.Errors("InvalidString"),error));
            };
   };
   RangeGen.iter = RangeGen.iterator = function (from, to, step, error) {
            var invalid = RangeGen.validate(from,to);
            if (invalid) {
               return RangeGen.handleError(invalid,error,true);
            };
            var proto = {
                __init: function (from, to, step, error) {
                      var calc = RangeGen.calculate(from,to,step,1),
                          self = this;
                      Object.keys(calc).map(function(key){
                          self[key] = calc[key];
                      });
                      this.error = error;
                      this.length = this.left = this.loops;
                      return this;
                },
                hasNext: function () {
                      return !!(this.left>0);
                },
                next: function () {
                      if (this.hasNext()) {
                         var str = RangeGen.enc(this.from,this.lcase);
                         this.from += this.incr;
                         --this.left;
                         return str;
                       } else {
                         return RangeGen.handleError(RangeGen.Errors("NoSuchElement"),this.error,true);
                      }
                },
            };
            return (function(){
                   return Object.create(proto);
            })().__init(from,to,step,error);
   };
   RangeGen.handleError = function (obj, error, boolean) {
            if (!error) {
               return (!boolean?[]:false);
             } else {
               throw new RangeGen.Error(obj);
            }
   };
   RangeGen.Errors = function (name) {
            var Errors = {
                "NotGenerated": {name:"NotGenerated",message:"Failed to generate a valid range!"},
                "InvalidInput": {name:"InvalidInput",message:"\"from\" and \"to\" must be letters or numbers only!"},
                "InvalidString": {name:"InvalidString",message:"Invalid string. Must be in the form of \"FROM..TO\"!"},
                "InvalidFrom": {name:"InvalidFrom",message:"\"from\" must be a letter!"},
                "InvalidTo": {name:"InvalidTo",message:"\"to\" must be a letter!"},
                "InvalidStr": {name:"InvalidStr",message:"\"str\" must be a letter!"},
                "NoSuchElement": {name:"NoSuchElement",message:"No more elements left in the iterator!"},
                "Unknown": {name:"UnknownError",message:"An unknown error has occurred!"}
            };
            return (Errors[name]?Errors[name]:Errors["Unknown"]);
   };
   RangeGen.Error = function (obj) {
            obj = obj||{};
            this.name = obj.name||"UnknownError";
            this.message = obj.message||"An unknown error has occurred!";
   };
   RangeGen.Error.prototype = new Error();
   RangeGen.Error.prototype.constructor = RangeGen.Error;
   Setup(RangeGen);
})((typeof exports!=="undefined"?function(fn){module.exports=fn;}:function(fn){this["RangeGen"]=fn;}));
