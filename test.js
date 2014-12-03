var test = require('tape');
var TableEditor = require('./index');

var editor = new TableEditor();

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
  var ed = new TableEditor();

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

test('delete a row', function (t) {
  t.plan(1);
  var ed = new TableEditor();

  ed.import([
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' }
  ]);

  ed.destroyRow(1);

  t.deepEqual(JSON.stringify(ed.getRows()), JSON.stringify([
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' }
  ]));
});

test('delete a column', function (t) {
  t.plan(1);
  var ed = new TableEditor();

  ed.import([
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' }
  ]);

  var id = ed.get('columns.0.id');
  ed.destroyColumn(id);

  t.deepEqual(JSON.stringify(ed.getRows()), JSON.stringify([
    { wat: 'wooooo' },
    { wat: 'wooooo' },
    { wat: 'wooooo' }
  ]));
});

test('toJSON should export stringified JSON', function (t) {
  t.plan(1);
  var ed = new TableEditor();

  var data = [
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' },
    { example: 'weeeee', wat: 'wooooo' }
  ];

  ed.import(data);
  t.deepEqual(JSON.stringify(ed.getRows()), JSON.stringify(data));
});

test('should support name, description, publisher', function (t) {
  t.plan(1);
    
  var ed = new TableEditor({
    data: {
      name: 'example',
      description: 'example text',
      publisher: 'somebody'
    }
  });

  var data = {
    name: 'example',
    description: 'example text',
    publisher: 'somebody',
    rows: [
      { example: 'weeeee', wat: 'wooooo' },
      { example: 'weeeee', wat: 'wooooo' },
      { example: 'weeeee', wat: 'wooooo' }
    ]
  };
  
  ed.import(data.rows);
  t.deepEqual(ed.toJSON(), JSON.stringify(data));
});
