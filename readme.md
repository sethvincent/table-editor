# table-editor
> a module for creating a very simple editor for tabular data.

## Install

```
npm install --save table-editor
```

It's designed for use with browserify, but you can alternatively grab the `table-editor.js` file.

## Usage

Here's a basic example:

```js
var TableEditor = require('table-editor');

var data = {
  headers: [
    { name: 'example', type: 'string' }
  ],
  rows: [
    { example: null },
    { example: null },
    { example: null }
  ]
};

var editor = new TableEditor('main-content', data);

editor.on('change', function(change, data){
  console.log(change, data);
});
```

## Example

Look at the [example.js](https://github.com/sethvincent/table-editor/blob/master/example.js) and [index.html](https://github.com/sethvincent/table-editor/blob/master/index.html) files for example usage that includes add row and add column buttons.

You can see the example in action here: http://sethvincent.github.io/table-editor/

## Contributing
The table-editor.js file is bundled for each release. Edit the index.js file.

## License
MIT