var fs = require('fs');
var on = require('component-delegate').bind;
var TableEditor = require('../index');
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

var dump = document.getElementById('json-dump');

editor.on('change', function (change) {
  dump.value = editor.toJSON();
});

on(document.body, '#add-row', 'click', function(e) {
  editor.addRow();
});

on(document.body, '#add-column', 'click', function(e) {
  var name = window.prompt('New column name');
  editor.addColumn({ name: name, type: 'string' });
});
