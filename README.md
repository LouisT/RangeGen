RangeGen (v0.2.7)
======

Install: npm install [rangegen](https://www.npmjs.org/package/rangegen "Title")

This project is [Unlicensed](http://unlicense.org/ "Title").
In other words, I don't care what you do with it.
However, if you make something interesting, I would like to check it out.

Information:
------
Generate a range between two numbers or letters. Examples: 1-100, a-z, A-Z, a-zz or even A-ZZZZZ.

Online example: [http://louist.github.io/RangeGen/example.html](http://louist.github.io/RangeGen/example.html "Title")

View more examples on [GitHub](https://github.com/LouisT/RangeGen/tree/master/examples "Title").

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
    RangeGen.inRange(<str>,<from>,<to>[,<step>[,<exceptions>[,<callback>]]]);

        Str          - The number(s) or letter(s) to validate. (Number, Float, Letters)
        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Step*        - The amount to increment or decrement by. Default, 1. (Boolean, Number, Float)
        Exceptions*  - Throw error messages. Default, return false. (Boolean)
        Callback*    - Use a callback instead of return.
                     * Optional.

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

    -- Inject "range()" into the String prototype. (See "examples4.js" for usage) --
    RangeGen.addPrototype();
    RangeGen.addPro();

        Usage: "FROM..TO".range([<step>[,<exceptions>[,<callback>]]]);

        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Step*        - The amount to increment or decrement by. Default, 1. (Boolean, Number, Float)
        Exceptions*  - Throw error messages. Default, return false. (Boolean)
        Callback*    - Use a callback instead of return.
                     * Optional.

    -- Readable stream. (Node.js ONLY, See examples5.js for usage) --
    var stream = RangeGen.createReadStream(<from>,<to>[,<step>]);
                 RangeGen.CRS(<from>,<to>[,<step>]);

        From         - The letter or number to start the range at. (Number, Float, Letters)
        To           - The letter or number to end on/near. (Number, Float, Letters)
        Step*        - The amount to increment or decrement by. Default, 1. (Boolean, Number, Float)

        NOTE: If you use this outside of Node.js it will throw a "NodeOnly" error!
              Stream API: http://nodejs.org/api/stream.html#stream_class_stream_readable

    -- Iterators. (See "examples2.js" for usage) --
    var iterator = RangeGen.iterator(<from>,<to>[,<step>[,<exceptions>]]);
                   RangeGen.iter(<from>,<to>[,<step>[,<exceptions>]]);

        hasNext()    - Returns true if the iteration has more elements.
        next()       - Returns the next element in the iteration, or false if `exceptions` is not set.
                       Otherwise throws a `NoSuchElement` exception.
        length       - The total number of iterations.
        left         - The number of iterations left.
