RangeGen (v0.1.1)
======

Install: npm install rangegen

This project is [Unlicensed](http://unlicense.org/ "Title").
In other words, I don't care what you do with it.
However, if you make something interesting, I would like to check it out.

Information:
------
Generate a range between two numbers or letters. Examples: 1-100, a-z, A-Z, a-zz or even A-ZZZZZ.

Usage:
-------
    *WARNING* Running range on a big letter gap causes MANY loops!
              For instance, a-zzzzz creates an array with 12,356,630
              indexes and does 73,645,526 while and for loops!

    RangeGen(<from>,<to>,[<step>[,<exceptions>]]);
    
    From         - The letter or number to start the range at. (numbers/letters)
    To           - The letter or number to end on/near. (numbers/letters)
    Step*        - The amount to increment or decrement by. Default, 1. (true/false, number)
    exceptions*  - Throw error messages. Default, return an empty array. (true/false);

      * Optional, see "Examples" for usage.

Examples:
-------
```javascript
var RangeGen = require('rangegen');
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
```
```html
<script src="./rangegen.js"></script>
<script>
try {
   var a = RangeGen("a","z");
   alert("[a-z] "+a.join(",")+"\n");
   var b = RangeGen("z","a");
   alert("[z-a] "+b.join(",")+"\n");
   var c = RangeGen("A","ZZ",10);
   alert("[A-ZZ,10] "+c.join(",")+"\n");
   var d = RangeGen("ZZ","A",10);
   alert("[ZZ-A,10] "+d.join(",")+"\n");
   var e = RangeGen(0,100,10);
   alert("[0-100,10] "+e.join(",")+"\n");
   var f = RangeGen(100,0,10);
   alert("[100-0,10] "+f.join(",")+"\n");
 } catch (e) {
   alert(e);
};
</script>
```
