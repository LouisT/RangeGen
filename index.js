/*
  RangeGen - Node.js & Browser
  By Louis T. <louist@ltdev.im>
  https://github.com/LouisT/RangeGen/
*/
(function(Setup){
   var RangeGen = function (from, to, step, error) {
           var range = [];
           step = ~~(isNaN(step)||1>step?1:step);
           if (!(/^([a-z]+|[0-9]+)$/i.test(from)) || !(/^([a-z]+|[0-9]+)$/i.test(to))) {
              return RangeGen.handleError({name:"InvalidInput",message:"\"from\" and \"to\" must be letters or numbers only!"},error);
           };
           if (isNaN(from) || isNaN(to)) {
              if (isNaN(from)) {
                 var lcase = (from==from.toUpperCase());
                 from = RangeGen.dec(from);
               } else {
                 return RangeGen.handleError({name:"InvalidFrom",message:"\"from\" must be a letter!"},error);
              };
              if (isNaN(to)) {
                 to = RangeGen.dec(to);
               } else {
                 return RangeGen.handleError({name:"InvalidTo",message:"\"to\" must be a letter!"},error);
              };
           };
           var from = Number(from),
               to = Number(to),
               direction = !(from>to),
               incr = (direction?step:-step),
               start = (direction?from:to),
               end = (direction?to:from),
               loops = ~~((end-start)/step+2);
           while (--loops) {
               range.push((lcase==undefined?from:RangeGen.enc(from,lcase)));
               from += incr;
           };
           return range;
   };
   RangeGen.enc = function (num,lcase) {
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
   RangeGen.handleError = function (obj,error) {
            if (!error) {
               return [];
             } else {
               throw new RangeGen.Error(obj);
            }
   };
   RangeGen.Error = function (obj) {
            obj = obj||{};
            this.name = obj.name||"UnknownError";
            this.message = obj.message||"An unknown error has occurred!";
   }
   RangeGen.Error.prototype = new Error();
   RangeGen.Error.prototype.constructor = RangeGen.Error;
   Setup(RangeGen);
})((typeof exports!=='undefined'?function(fn){module.exports=fn;}:function(fn){this['RangeGen']=fn;}));
