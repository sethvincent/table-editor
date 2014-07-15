var TableEditor = require('./index');
var prettify = require('jsonpretty');
var elClass = require('element-class');

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

/*
editor.on('change', function(change, data){
  console.log(change, data);
});
*/

var addRow = document.getElementById('add-row');
addRow.addEventListener('click', function (e) {
  console.log('add row', e);
  editor.addRow();
});

var addColumn = document.getElementById('add-column');
addColumn.addEventListener('click', function (e) {
  var name = window.prompt('New column name');
  editor.addColumn({ name: name, type: 'string' });
});

var codeBox = document.getElementById('code-box');
var textarea = codeBox.querySelector('textarea');

var showJSON = document.getElementById('show-json');
showJSON.addEventListener('click', function (e) {
  editor.getJSON(function (data) {
    textarea.value = prettify(data);
    elClass(codeBox).remove('hidden');
  });
});

var showCSV = document.getElementById('show-csv');
showCSV.addEventListener('click', function (e) {
  editor.getCSV(function (data) {
    textarea.value = data;
    elClass(codeBox).remove('hidden');
  });
});

var close = document.getElementById('close');
close.addEventListener('click', function (e) {
  textarea.value = '';
  elClass(codeBox).add('hidden');
});
