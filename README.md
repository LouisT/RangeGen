RangeGen (v0.2.4)
======

Install: npm install rangegen

This project is [Unlicensed](http://unlicense.org/ "Title").
In other words, I don't care what you do with it.
However, if you make something interesting, I would like to check it out.

Information:
------
Generate a range between two numbers or letters. Examples: 1-100, a-z, A-Z, a-zz or even A-ZZZZZ.
Example: [http://louist.github.io/RangeGen/example.html](http://louist.github.io/RangeGen/example.html "Title")

Usage:
-------
    *WARNING* Running range on a big letter gap causes MANY loops!
              For instance, a-zzzzz creates an array with 12,356,630
              indexes and does 73,645,526 while and for loops!

    -- Array generator (See "examples.js" for usage) --
    var array = RangeGen(<from>,<to>,[<step>[,<exceptions>[,<CB/filter>]]]);

        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Step*        - The amount to increment or decrement by. Default, 1. (Boolean, Number, Float)
        Exceptions*  - Throw error messages. Default, return an empty array. (Boolean)
        CB/filter*   - Use a callback or filter results. (see example4.js)
                     * Optional.

    -- Check to see if a number or letter is in a range. (Case sensitive, "AB" is not in "a..az". See "examples4.js" for usage) --
    RangeGen.inRange(<str>,<from>,<to>[,<exceptions>[,<callback>]]);

        Str          - The number(s) or letter(s) to validate. (Number, Float, Letters)
        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Exceptions*  - Throw error messages. Default, return false. (Boolean)
        Callback*    - Use a callback instead of return.
                     * Optional.

        NOTE: I need to figure out how to implement "step" for this.

    -- Get the Nth value in a given range. (See "examples4.js" for usage) --
    RangeGen.byIndex(<num>,<from>,<to>,[<step>[,<exceptions>[,<callback>]]]);

        Num          - The index number within the range. (Number)
        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Step*        - The amount to increment or decrement by. Default, 1. (Boolean, Number, Float)
        Exceptions*  - Throw error messages. Default, return false. (Boolean)
        Callback*    - Use a callback instead of return.
                     * Optional.

    -- Get the index by value in a given range. (See "examples4.js" for usage) --
    RangeGen.byValue(<str>,<from>,<to>,[<step>[,<exceptions>[,<callback>]]]);

        Str          - The value within the range. (Number, Float, Letters)
        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Step*        - The amount to increment or decrement by. Default, 1. (Boolean, Number, Float)
        Exceptions*  - Throw error messages. Default, return false. (Boolean)
        Callback*    - Use a callback instead of return.
                     * Optional.

    -- Iterators (See "examples2.js" for usage) --
    var iterator = RangeGen.iterator(<from>,<to>[,<step>[,<exceptions>]]);
                   RangeGen.iter(<from>,<to>[,<step>[,<exceptions>]])

        hasNext()    - Returns true if the iteration has more elements.
        next()       - Returns the next element in the iteration, or false if `exceptions` is not set.
                       Otherwise throws a `NoSuchElement` exception.
        length       - The total number of iterations.
        left         - The number of iterations left.


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
   var g = RangeGen(0,1,0.1);
   console.log("[0-1,0.1] "+g.join(",")+"\n");
   var h = RangeGen(1,0,0.1);
   console.log("[1-0,0.1] "+h.join(",")+"\n");
   console.log("\n --- Floats with `map(function(x) { return x.toPrecision(2); })` ---");
   console.log("[0-1,0.1] "+g.map(function(x) { return x.toPrecision(2); }).join(",")+"\n");
   console.log("[1-0,0.1] "+h.map(function(x) { return x.toPrecision(2); }).join(',')+"\n");
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
```javascript
var RangeGen = require('rangegen');
try {
   var iterator = RangeGen.iter(-30,30,1,true);
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
   console.log("\n- Invalid range. [a-30] -");
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
```
```html
<html>
<head>
<title>RangeGen test</title>
<script src="./rangegen.js"></script>
<script>
window.onload = function () {
     try {
        var a = RangeGen("a","z");
        output("[a-z] "+a.join(",")+"\n");
        var b = RangeGen("z","a");
        output("[z-a] "+b.join(",")+"\n");
        var c = RangeGen("A","ZZ",10);
        output("[A-ZZ,10] "+c.join(",")+"\n");
        var d = RangeGen("ZZ","A",10);
        output("[ZZ-A,10] "+d.join(",")+"\n");
        var e = RangeGen(0,100,10);
        output("[0-100,10] "+e.join(",")+"\n");
        var f = RangeGen(100,0,10);
        output("[100-0,10] "+f.join(",")+"\n");
        var g = RangeGen(0,1,0.1);
        output("[0-1,0.1] "+g.join(",")+"\n");
        var h = RangeGen(1,0,0.1);
        output("[1-0,0.1] "+h.join(",")+"\n");
        output("<br /> --- Floats with `map(function(x) { return x.toPrecision(2); })` ---");
        output("[0-1,0.1] "+g.map(function(x) { return x.toPrecision(2); }).join(",")+"\n");
        output("[1-0,0.1] "+h.map(function(x) { return x.toPrecision(2); }).join(',')+"\n");
      } catch (e) {
        output(e);
     };
     try {
        var iterator = RangeGen.iter(-30,30,5,true);
        output("<br />Iterations: "+iterator.length);
        var range = [];
        while (iterator.hasNext()) {
              range.push(iterator.next());
        };
        output(range.join(','));
      } catch (e) {
        output(e);
     };
};
function output (x) {
         document.getElementById("output").innerHTML += x+"<br />";
};
</script>
</head>
<body>
<div id="output"></div>
</body>
</html>
```
```javascript
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
```
