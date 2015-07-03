function print() {
    __asmh__({},"#include <stdio.h>");
    for ( var i = 0, e = arguments.length; i < e; ++i ) {
        if (i > 0)
            __asm__({},[],[],"putchar(' ');");
        __asm__({},[],[["x", arguments[i]]],
                '%[x] = js::toString(&frame, %[x]);\n'+
                'printf("%s", %[x].raw.sval->getStr());'
        );
    }
    __asm__({},[],[],"putchar('\\n');");
}

var console = { log: print };

Function.prototype.call = function call (thisArg)
{
   __asm__({},[],[["thisArg", thisArg]],
            'return argc > 1' +
              '? js::call(&frame, argv[0], argc-1, argv+1)' +
              ': js::call(&frame, argv[0], 1, &%[thisArg]);'
   );
}
