var fs = require('fs');
var Emitter = require('component-emitter');
var View = require('ractive');
var flatten = require('flat');
var extend = require('extend');
var convert = require('json-2-csv').json2csv;

module.exports = TableEditor;
Emitter(TableEditor.prototype);

function TableEditor (id, data, tableTemplate) {
  if (!(this instanceof TableEditor)) return new TableEditor(id, data, tableTemplate, rowTemplate);
  var self = this;

  this.data = data || { headers: [], rows: [] };
  this.tableTemplate = tableTemplate || fs.readFileSync('./templates/table.html', 'utf8');

  this.view = new View({
    el: id,
    template: View.parse(this.tableTemplate),
    data: this.data
  });

  this.view.on('change', function (value) {
    var change = flatten.unflatten(value);
    self.data = extend(true, self.data, change);
    self.emit('change', change, self.data);
  });
}

TableEditor.prototype.get = function (key) {
  return this.view.get(key);
};

TableEditor.prototype.set = function (key, value) {
  return this.view.set(key, value);
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
  this.update();
};

TableEditor.prototype.deleteColumn = function (name) {
  var self = this;

  this.data.rows.forEach(function(row, i) {
    delete self.data.rows[i][name];
  });

  this.data.headers.forEach(function(header, i) {
    if (header.name === name) self.data.headers.splice(i, 1);
  });

  this.update();
};

TableEditor.prototype.renameColumn = function (oldKey, newKey) {
  var self = this;

  this.data.headers.forEach(function(header, i) {
    if (header.name === oldKey) header.name = newKey;
  });

  this.data.rows.forEach(function(row, i) {
    row[newKey] = row[oldKey];
    delete row[oldKey];
  });

  this.update();
};

TableEditor.prototype.emptyRow = function () {
  var obj = {};
  this.data.headers.forEach(function (header) {
    obj[header.name] = null;
  });
  return obj;
};

TableEditor.prototype.update = function () {
  this.emit('change', '', this.data);
  this.view.update();
};

TableEditor.prototype.reset = function (data) {
  this.set(data || { headers: [], rows: [] });
};