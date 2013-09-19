var RangeGen = require('./');
try {
   var a = RangeGen("a","z");
   console.log("[a-z] "+a.join(",")+"\n");
   var b = RangeGen("z","a");
   console.log("[z-a] "+b.join(",")+"\n");
   var c = RangeGen("A","ZZ",10);
   console.log("[A-ZZ,10] "+c.join(",")+"\n");
   var d = RangeGen("ZZ","A",10);
   console.log("[ZZ-A,10] "+d.join(",")+"\n");
   var e = RangeGen(0,100,10);
   console.log("[0-100,10] "+e.join(",")+"\n");
   var f = RangeGen(100,0,10);
   console.log("[100-0,10] "+f.join(",")+"\n");
 } catch (e) {
   console.log(e);
};
console.log("\n--- Throw errors! ---");
try {
   RangeGen("a",100,1,true);
 } catch (e) {
   console.log("[a-100] "+e+"\n");
};
try {
   RangeGen(100,"z",1,true);
 } catch (e) {
   console.log("[100-a] "+e+"\n");
};
try {
   console.log(RangeGen("@","!",1,true));
 } catch (e) {
   console.log("[@-!] "+e+"\n");
};
try {
   console.log(RangeGen("a","!",1,true));
 } catch (e) {
   console.log("[a-!] "+e+"\n");
};
console.log("\n--- Return empty arrays! ---");
console.log(RangeGen("a","100"));
console.log(RangeGen("100","z"));
console.log(RangeGen("@","!"));
console.log(RangeGen("a","!"));
