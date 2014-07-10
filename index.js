var fs = require('fs');
var Emitter = require('component-emitter');
var View = require('ractive');
var flatten = require('flat');
var extend = require('extend');

module.exports = TableEditor;
Emitter(TableEditor.prototype);

function TableEditor (id, data, tableTemplate, rowTemplate) {
  if (!(this instanceof TableEditor)) return new TableEditor(id, data, tableTemplate, rowTemplate);
  var self = this;

  this.data = data;
  this.tableTemplate = tableTemplate || fs.readFileSync('./templates/table.html', 'utf8');

  this.tableView = new View({
    el: id,
    template: View.parse(this.tableTemplate),
    data: this.data
  });

  this.tableView.on('change', function (value) {
    var change = flatten.unflatten(value);
    self.data = extend(true, self.data, change);
    self.emit('change', change, self.data);
  });
}

TableEditor.prototype.addRow = function (row) {
  if (row) this.data.rows.push(row);
  else this.data.rows.push(this.emptyRow());
};

TableEditor.prototype.addColumn = function (header) {
  this.data.rows.forEach(function(row, i) {
    row[header.name] = null;
  });
  this.data.headers.push(header);
  this.tableView.update();
};

TableEditor.prototype.emptyRow = function () {
  var obj = {};
  this.data.headers.forEach(function (header) {
    obj[header.name] = null;
  });
  return obj;
}