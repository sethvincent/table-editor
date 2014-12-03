# table-editor
> a module for creating a very simple editor for tabular data.

## Install

```
npm install --save table-editor
```

It's designed for use with browserify, but you can alternatively grab the `table-editor.js` file.

## Examples


### Simple example:

```js
var fs = require('fs');
var on = require('component-delegate').bind;
var TableEditor = require('table-editor');
var template = fs.readFileSync(__dirname + '/table.html', 'utf8');

var editor = new TableEditor({
  el: 'editor',
  template: template,
});

editor.import([
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' }
]);

editor.on('change', function (change) {
  console.log(editor.data.rows);
});

on(document.body, '#add-row', 'click', function(e) {
  editor.addRow();
});

on(document.body, '#add-column', 'click', function(e) {
  var name = window.prompt('New column name');
  editor.addColumn({ name: name, type: 'string' });
});

```

Check out the rest of the above example, including an index.html file and the table.html template in the [`gh-pages` branch of this repo](https://github.com/sethvincent/table-editor/tree/gh-pages).

## Extended example

This module is being created specifically for this project: http://github.com/flatsheet/editor

Check out that repo for an extended example of table-editor usage, including an alternate table template and pretty much full usage of the table-editor API.

You can see the flatsheet example in action here: http://flatsheet.io/editor

## Contributing
Note: The table-editor.js file is bundled for each release. Edit the index.js file.

- Fork this repository
- Create your feature branch: `git checkout -b new-feature`
- Commit your changes: `git commit -m 'Add new feature'`
- Push to the branch: `git push origin new-feature`
- Submit a pull request via GitHub

## License
MIT
