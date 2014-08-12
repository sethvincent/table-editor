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

console.log(process.env)

var dump = document.getElementById('json-dump');
dump.value = editor.toJSON();

editor.on('change', function (change) {
  dump.value = editor.toJSON();
});

on(document.body, '#add-row', 'click', function(e) {
  editor.addRow();
});

on(document.body, '.destroy-row', 'click', function(e) {
  editor.destroyRow(e.target.id);
});

on(document.body, '#add-column', 'click', function(e) {
  var name = window.prompt('New column name');
  editor.addColumn({ name: name, type: 'string' });
});

on(document.body, '.destroy-column', 'click', function(e) {
  console.log(e.target.id)
  editor.destroyColumn(e.target.id);
});
