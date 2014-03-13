var range = require('../');
try {
   console.log("--- As a callback ---");
   range(1,10,3,null,function (x) { console.log(x.join(',')) });
   console.log("\n--- As a filter ---");
   console.log(range(1,100,3,null,function (x) { return x.filter(function(y) { return y%4===0; }); }).join(','));
   console.log("\n-- inRange examples --");
   console.log("[c in a..z] "+range.inRange('c','a','z'));
   console.log("[aa in a..z] "+range.inRange('aa','a','z'));
   console.log("[ab in a..az] "+range.inRange('ab','a','az'));
   console.log("[ab in a..zz, 5] "+range.inRange('ab','a','az',5));
   console.log("[cjsr in a..zzzzzzz] "+range.inRange('cjsr','a','zzzzzzz'));
   console.log("[zzzzzzz in a..zzzzz] "+range.inRange('zzzzzzz','a','zzzzz'));
   console.log("\n-- byIndex examples --");
   console.log("[10 in a..z] "+range.byIndex(10,"a","z"));
   console.log("[100 in a..zz] "+range.byIndex(100,"a","zz"));
   console.log("[26 in a..z] "+range.byIndex(26,"a","z"));
   console.log("\n-- byValue examples --");
   console.log("[g in a..z] "+range.byValue("g","a","z"));
   console.log("[g in a..z, 2] "+range.byValue("g","a","z",2));
   console.log("[g in a..z, 5] "+range.byValue("g","a","z",5));
 } catch (e) {
   console.log(e);
};
