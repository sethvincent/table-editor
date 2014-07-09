var fs = require('fs');
var Emitter = require('component-emitter');
var inherits = require('inherits');
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

TableEditor.prototype.addRow = function () {

};

TableEditor.prototype.addColumn = function () {

};