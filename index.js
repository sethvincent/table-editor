var fs = require('fs');
var Emitter = require('component-emitter');
var View = require('ractive');
var flatten = require('flat');
var extend = require('extend');
var convert = require('json-2-csv').json2csv;

module.exports = TableEditor;
Emitter(TableEditor.prototype);

function TableEditor (id, data, tableTemplate, rowTemplate) {
  if (!(this instanceof TableEditor)) return new TableEditor(id, data, tableTemplate, rowTemplate);
  var self = this;

  this.data = data || { headers: [], rows: [] };
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

TableEditor.prototype.get = function (key) {
  return this.tableView.get(key);
};

TableEditor.prototype.set = function (key, value) {
  return this.tableView.set(key, value);
};

TableEditor.prototype.getJSON = function (cb) {
  cb(this.data.rows);
};

TableEditor.prototype.getCSV = function (cb) {
  convert(this.data.rows, function (err, csv) {
    cb(csv)
  });
};

TableEditor.prototype.addRow = function (row) {
  row || (row = {});
  var newRow = extend(this.emptyRow(), row);
  this.data.rows.push(newRow);
};

TableEditor.prototype.deleteRow = function (index) {
  this.data.rows.forEach(function(row, i) {
    if (index = i) this.data.rows[i].pop();
  });
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
};

TableEditor.prototype.changeColumnName = function (oldKey, newKey) {
  this.data.headers[newKey] = this.data.headers[oldKey];
  delete this.data.headers[oldKey];
  this.tableView.update();
};

TableEditor.prototype.update = function () {
  this.tableView.update();
};

TableEditor.prototype.reset = function (data) {
  this.set(data || { headers: [], rows: [] });
};