# table-editor
> a module for creating a (very) simple spreadsheet-style editor

## Install

```
npm install --save table-editor
```

It's designed for use with browserify, but you can alternatively grab the `table-editor.min.js` file.

## Usage

Here's a basic example:

```js
var TableEditor = require('./index');

var headers = [
  { name: 'wat', type: 'string' },
  { name: 'pizza', type: 'string' },
  { name: 'poop', type: 'string' }
];

var rows = [
  { wat: 'weeee', pizza: 'wokowokow', poop: 'ok' },
  { wat: 'pooooo', pizza: 'wokowokow', poop: 'ok' },
  { wat: 'okkkkkk', pizza: 'wokowokow', poop: 'ok' }
];

var editor = new TableEditor('main-content', { headers: headers, rows: rows });

editor.on('change', function(value, column, i, rows, ev){
  console.log(value, column, i, rows, ev);
});
```

## License
MIT