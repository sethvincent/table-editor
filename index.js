var fs = require('fs');
var domify = require('domify');
var template = require('lodash.template');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = TableEditor;
inherits(TableEditor, EventEmitter);

var tableTpl = fs.readFileSync('./templates/table.html', 'utf8');
var rowTpl = fs.readFileSync('./templates/row.html', 'utf8');

function TableEditor (id, data, tableTemplate, rowTemplate) {
  this.headers = data.headers;
  this.rows = data.rows;
  this.rowsHTML = '';

  this.tableTemplate = template(tableTemplate || tableTpl);
  this.rowTemplate = template(rowTemplate || rowTpl);

  var self = this;

  this.rows.forEach(function (row, i) {
    self.rowsHTML += self.rowTemplate({ row:row, i:i });
  });

  var html = domify(this.tableTemplate({ headers: this.headers, rows: this.rowsHTML }));
  this.container = document.getElementById(id);
  this.container.appendChild(html);

  var choose = require('attr-chooser')('active', function (el, ev) {
    var field = el.parentNode.className;
    var rowIndex = el.parentNode.parentNode.className;
    self.emit('active', field, rowIndex, el, ev);
    
    el.addEventListener('input', function(e) {
      self.rows[rowIndex][field] = el.value;
      self.emit('change', self.rows[rowIndex][field], field, rowIndex, self.rows, e);
    }, false);
  });

  var elems = document.querySelectorAll('*[chooser]');
  for (var i = 0; i < elems.length; i++) {
    choose(elems[i], elems[i].getAttribute('chooser'));
  }
}