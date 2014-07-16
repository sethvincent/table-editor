var test = require('tape');
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

test('create editor', function (t) {
  t.plan(1);
  t.ok(editor);
});

test('get a value', function (t) {
  t.plan(1);
  t.equals(editor.get('headers.0.name'), 'wat');
});

test('set a value', function (t) {
  t.plan(1);
  editor.set('headers.1.name', 'woohoo').then( function () {
    t.equals(editor.get('headers.1.name'), 'woohoo');
  });
});

test('watch for changes', function (t) {
  t.plan(1);
  var ed = new TableEditor('main-content', { headers: headers, rows: rows });

  ed.on('change', function(change, data){
    t.equals(change.rows[0].wat, 'testing');
  });
  ed.set('rows.0.wat', 'testing');
});
