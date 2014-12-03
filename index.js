var fs = require('fs');
var on = require('component-delegate').bind;
var TableEditor = require('table-editor');
var template = fs.readFileSync(__dirname + '/table.html', 'utf8');

var editor = new TableEditor({
  el: 'table-editor',
  template: template,
  data: {
    name: 'example',
    description: 'this is an example dataset',
    publisher: 'seth vincent'
  }
});

editor.import([
  { example: '1', wat: 'a' },
  { example: '2', wat: 'b' },
  { example: '3', wat: 'c' }
]);

var dump = document.getElementById('json-dump');
dump.value = editor.toJSON(2);

editor.on('change', function (change) {
  dump.value = editor.toJSON(2);
});

on(document.body, '#add-row', 'click', function(e) {
  editor.addRow();
});

on(document.body, '.destroy-row', 'click', function(e) {
  editor.destroyRow(e.target.id);
});

on(document.body, '#add-column', 'click', function(e) {
  var columns = editor.get('columns');
  editor.addColumn({ name: 'column ' + (columns.length+1), type: 'string' });
});

on(document.body, '.destroy-column', 'click', function(e) {
  editor.destroyColumn(e.target.id);
});
