# cwise-parser

JavaScript関数の本体を解析・分析する[cwise](https://github.com/scijs/cwise)のプリプロセッサです。これは内部コンポーネントであり、スタンドアロンでの使用を目的としたものではありません。

[
![build status](https://secure.travis-ci.org/scijs/cwise-parser.png)
](http://travis-ci.org/scijs/cwise-parser)

## 概要

このモジュールはJavaScript関数を受け取り、`esprima`を使用して抽象構文木（AST）に解析します。その後、ASTをトラバースして以下の処理を行います:

- 各関数引数の使用状況を分析し、左辺値（代入される側）、右辺値（読み取られる側）、またはその両方として使用されているかを追跡します。
- 関数本体を書き換え、引数名、ローカル変数、`this`式を、衝突しない一意の識別子に置き換えます。
- 書き換えられたコードと引数の分析結果を含む構造化されたオブジェクトを返します。これはその後、`cwise`によるコード生成に使用されます。

## インストール

[npm](https://www.npmjs.com/)を使用してインストールします:

```bash
npm install cwise-parser
```

このパッケージはESモジュールであり、[Deno](https://deno.land/)とも互換性があります。

## 使い方

このモジュールは、JavaScript関数を引数として受け取る単一の関数をエクスポートします。

```javascript
import parse from "cwise-parser";

const parsed = parse(function(a, b, c) {
  a += b;
  c = Math.cos(b);
});

console.log(parsed);
```

### 出力例

`parse`関数は、書き換えられた関数本体と変数に関するメタデータを含むオブジェクトを返します。上記の例の出力は以下のようになります:

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

## デモ

npmスクリプトを使用して、同梱されているDenoの例を実行できます:

```bash
# demo.jsを実行します
npm run demo

# demo2.jsを実行します
npm run demo2
```

## ライセンス

MIT © 2013 Mikola Lysenko — 詳細は[LICENSE](LICENSE)を参照してください。
