var util = require("util")
var name = process.argv[2]

console.error("Generate API skeletons for %s", name);


function printCode(name, childName, objName)
{
    var fnName = [name.toLowerCase(), childName.toLowerCase()].join("_")
    var tpl = "hidden(%s, \"%s\", function %s(x)\n{\n\n});\n\n"
    var code = util.format(tpl, objName || name, childName, fnName)
    console.log(code);
}

function loop(obj, cb)
{
    obj && Object.getOwnPropertyNames(obj).forEach(function(k)
    {
        if (typeof obj[k] === "function")
        {
            cb(k)
        }
    })
}

loop(global[name], function(childName)
{
    printCode(name, childName)
})

loop(global[name].prototype, function(childName)
{
    printCode(name, childName, name + ".prototype")
})
