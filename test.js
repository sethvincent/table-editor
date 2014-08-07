var test = require('tape');
var TableEditor = require('./index');

var editor = new TableEditor({
  el: 'container'
});

editor.import([
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' }
]);

test('create editor', function (t) {
  t.plan(1);
  t.ok(editor);
});

test('get a value', function (t) {
  t.plan(1);
  t.equals(editor.get('columns.0.name'), 'example');
});

test('set a value', function (t) {
  t.plan(1);
  editor.set('columns.1.name', 'woohoo').then(function () {
    t.equals(editor.get('columns.1.name'), 'woohoo');
  });
});

test('watch for changes', function (t) {
  t.plan(1);
  var ed = new TableEditor({
    el: 'container'
  });

  ed.import([
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' }
  ]);

  ed.on('change', function(change, data){
    t.equals(change['rows.0.wat'], 'testing');
  });

  ed.set('rows.0.wat', 'testing');
});
