var range = require('../');
try {
   console.log("--- As a callback ---");
   range(1,10,3,null,function (x) { x.forEach(function (x) { console.log(x); }); });
   console.log("\n--- As a filter ---");
   console.log(range(1,100,3,null,function (x) { return x.filter(function(y) { return y%4===0; }); }).join(','));
 } catch (e) {
   console.log(e);
};
