import parse from "./cwise-parser.js";

  var parsed = parse(function(a, b, c) {
    a += b
    c = Math.cos(b)
  })
  
console.log(parsed);
