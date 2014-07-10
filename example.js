var TableEditor = require('./table-editor.js');

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

editor.on('change', function(change, data){
  console.log(change, data);
});

var addRow = document.getElementById('add-row');
addRow.addEventListener('click', function (e) {
  console.log('add row', e);
  editor.addRow();
});

var i = 0;
var addColumn = document.getElementById('add-column');
addColumn.addEventListener('click', function (e) {
  console.log('add column', e);
  editor.addColumn({ name: 'pizza ' + i, type: 'string' });
  i++;
});