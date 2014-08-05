var fs = require('fs');
var TableEditor = require('../index');
var template = fs.readFileSync(__dirname + '/table.html', 'utf8');

var editor = new TableEditor({
  el: 'container',
  template: template,
});

editor.import([
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' }
]);

editor.on('change', function (change) {
  console.log(editor.data.rows)
});
