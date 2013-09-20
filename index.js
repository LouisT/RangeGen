/*
  RangeGen - Node.js & Browser
  By Louis T. <louist@ltdev.im>
  https://github.com/LouisT/RangeGen/
*/
(function(Setup){
   var RangeGen = function (from, to, step, error) {
            var range = [];
            var invalid = RangeGen.validate(to,from);
            if (invalid) {
               return RangeGen.handleError(invalid,error);
            };
            var calc = RangeGen.calculate(from,to,RangeGen.getStep(step),2);
            while (--calc["loops"]) {
                range.push(RangeGen.enc(calc["from"],calc["lcase"]));
                calc["from"] += calc["incr"];
            };
            return range;
   };
   RangeGen.validate = function (to, from) {
            if ((/^([a-z]+|-?[0-9]+)$/i.test(from) && /^([a-z]+|-?[0-9]+)$/i.test(to))) {
               if (isNaN(from) || isNaN(to)) {
                  if (!isNaN(from)) {
                     return RangeGen.Errors("InvalidFrom");
                  };
                  if (!isNaN(to)) {
                     return RangeGen.Errors("InvalidTo");
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
   RangeGen.enc = function (num,lcase) {
            if (lcase==null) {
               return num;
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
            return ~~(isNaN(step)||1>step?1:step);
   };
   RangeGen.calculate = function (from, to, step, ext) {
            var lcase = (isNaN(from)?(from==from.toUpperCase()):null),
                from = RangeGen.getNum(from),
                to = RangeGen.getNum(to),
                direction = !(from>to),
                start = (direction?from:to),
                end = (direction?to:from);
            return {
                lcase: lcase,
                from: from,
                incr: (direction?step:-step),
                loops: ~~((end-start)/step+ext),
            };
   };
   RangeGen.iterator = function (from, to, step, error) {
            var invalid = RangeGen.validate(to,from);
            if (invalid) {
               return RangeGen.handleError(invalid,error,true);
            };
            var proto = {
                __init: function (from, to, step) {
                      var calc = RangeGen.calculate(from,to,step,1),
                          self = this;
                      Object.keys(calc).map(function(key){
                          self[key] = calc[key];
                      });
                      this.length = this.loops;
                      return this;
                },
                hasNext: function () {
                      return (this.loops>0?true:false);
                },
                next: function () {
                      if (this.hasNext()) {
                         var str = RangeGen.enc(this.from,this.lcase);
                         this.from += this.incr;
                         --this.loops;
                         return str;
                       } else {
                         return RangeGen.handleError(RangeGen.Errors("NoSuchElement"),error,true);
                      }
                },
            };
            return (function(){
                   return Object.create(proto);
            })().__init(from, to, RangeGen.getStep(step));
   }
   RangeGen.iter = RangeGen.iterator;
   RangeGen.handleError = function (obj,error,boolean) {
            if (!error) {
               return (!boolean?[]:false);
             } else {
               throw new RangeGen.Error(obj);
            }
   };
   RangeGen.Errors = function (name) {
            var Errors = {
                "InvalidInput": {name:"InvalidInput",message:"\"from\" and \"to\" must be letters or numbers only!"},
                "InvalidFrom": {name:"InvalidFrom",message:"\"from\" must be a letter!"},
                "InvalidTo": {name:"InvalidTo",message:"\"to\" must be a letter!"},
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
})((typeof exports!=='undefined'?function(fn){module.exports=fn;}:function(fn){this['RangeGen']=fn;}));
