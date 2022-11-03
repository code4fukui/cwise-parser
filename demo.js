import parse from "./index.js";

  var parsed = parse(function(a, b, c) {
    a += b
    c = Math.cos(b)
  })
  
console.log(parsed);
