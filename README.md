# cwise-parser

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A preprocessor for [cwise](https://github.com/scijs/cwise) that parses and analyzes the body of a JavaScript function. It is an internal component and not intended for standalone use.

[
![build status](https://secure.travis-ci.org/scijs/cwise-parser.png)
](http://travis-ci.org/scijs/cwise-parser)

## About

This module takes a JavaScript function and uses `esprima` to parse it into an Abstract Syntax Tree (AST). It then traverses the AST to:

-   Analyze the usage of each function argument, tracking whether it's used as an lvalue (assigned to), an rvalue (read from), or both.
-   Rewrite the function body, replacing argument names, local variables, and `this` expressions with unique, conflict-free identifiers.
-   Return a structured object containing the rewritten code and the argument analysis, which is then used by `cwise` for code generation.

## Install

Install using [npm](https://www.npmjs.com/):

```bash
npm install cwise-parser
```

This package is an ES module and is also compatible with [Deno](https://deno.land/).

## Usage

The module exports a single function that accepts a JavaScript function as its argument.

```javascript
import parse from "cwise-parser";

const parsed = parse(function(a, b, c) {
  a += b;
  c = Math.cos(b);
});

console.log(parsed);
```

### Example Output

The `parse` function returns an object containing the rewritten function body and metadata about its variables. The output for the example above looks like this:

```javascript
{
  body: '{ _inline_0_arg0_ += _inline_0_arg1_;\n  _inline_0_arg2_ = Math.cos(_inline_0_arg1_); }',
  args: [
    { name: '_inline_0_arg0_', lvalue: true, rvalue: true, count: 1 },
    { name: '_inline_0_arg1_', lvalue: false, rvalue: true, count: 2 },
    { name: '_inline_0_arg2_', lvalue: true, rvalue: false, count: 1 }
  ],
  thisVars: [],
  localVars: []
}
```

## Demos

You can run the included Deno examples using npm scripts:

```bash
# Runs demo.js
npm run demo

# Runs demo2.js
npm run demo2
```

## License

MIT © 2013 Mikola Lysenko — see [LICENSE](LICENSE).