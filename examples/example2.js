var RangeGen = require('../');
try {
   var iterator = RangeGen.iter(-30,30,5,true);
   console.log("Iterations: "+iterator.length);
   var range = [];
   while (iterator.hasNext()) {
         range.push(iterator.next());
   };
   console.log(range.join(','));
   var iterator = RangeGen.iter(0,1,0.1,true);
   console.log("Iterations: "+iterator.length);
   var range = [];
   while (iterator.hasNext()) {
         range.push(iterator.next());
   };
   console.log(range.join(','));
 } catch (e) {
   console.log(e);
};
console.log("\n--- Throw errors! ---");
try {
   console.log("- Invalid next() call. -");
   var iterator = RangeGen.iterator(-30,30,1,true);
   console.log("Iterations: "+iterator.length);
   var range = [];
   while (iterator.hasNext()) {
         range.push(iterator.next());
   };
   iterator.next();
 } catch (e) {
   console.log(e);
};
try {
   console.log("\n- Inalid range. [a-30] -");
   var iterator = RangeGen.iterator("a",30,1,true);
 } catch (e) {
   console.log(e);
};
console.log("\n--- Return false! ---");
try {
   var iterator = RangeGen.iterator("a",30,1);
   if (!iterator) {
      console.log("`iterator` is false!");
   }
 } catch (e) {
   console.log(e);
};
