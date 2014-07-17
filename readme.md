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

Make sure your index.html file has a div with an id of `#main-content`.

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