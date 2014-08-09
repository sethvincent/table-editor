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

on(document.body, '.destroy-row', 'click', function(e) {
  editor.destroyRow(e.target.id);
});

on(document.body, '#add-column', 'click', function(e) {
  var name = window.prompt('New column name');
  editor.addColumn({ name: name, type: 'string' });
});

on(document.body, '.destroy-column', 'click', function(e) {
  editor.destroyColumn(e.target.id);
});


/* listener for the table body
on(document.body, '#table-body', 'click', function (e) {
  var btn;

  if (e.target.tagName === 'TEXTAREA') {
    var cellEl = document.getElementById(closest(e.target, 'td').id);

    var id = closest(e.target, 'td').id;
    io.emit('cell-focus', '#' + id);

    e.target.onblur = function (e) {
      io.emit('cell-blur', '#' + id);
    }

    return;
  }

  else if (elClass(e.target).has('delete-row')) btn = e.target;
  else if (elClass(e.target).has('delete-btn-icon')) btn = closest(e.target, '.delete-row');
  else return;

  if (window.confirm('Sure you want to delete this row and its contents?')) {
    var row = closest(btn, 'tr');
    console.log('happenenenenen', row.className.split('-')[1])
    editor.destroyRow(row.className.split('-')[1]);
    editor.update();
  }
});
*/
