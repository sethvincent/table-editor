var View = require('ractive');
var uid = 0;

module.exports = View.extend({

  init: function (opts) {
    this.template = View.parse(opts.template);
  },

  import: function (items) {
    var columns = [];
    var columnIdByName = {};

    items.forEach( function (item) {
      Object.keys(item).forEach( function ( name ) {
        var columnId;

        if (!columnIdByName[name]) {
          columnId = '_' + uid++;
          columnIdByName[name] = columnId;

          columns.push({
            id: columnId,
            name: name,

            // TODO infer type, sensible default value
            type: 'string',
            defaultValue: function () { return null; }
          });
        }
      });
    });

    rows = items.map(function (item) {
      var row = {};

      Object.keys(item).forEach(function (name) {
        row[columnIdByName[name]] = item[name];
      });

      return row;
    });

    this.set({
      columns: columns,
      columnIdByName: columnIdByName,
      rows: rows
    });
  },

  addColumn: function (column) {
    var changes = {};
    var id = '_' + uid++;

    this.push('columns', {
      id: id,
      name: column.name,
      type: column.type || 'string'
    });

    var rows = this.get('rows');

    if (rows.length > 0) {
      rows.forEach(function (row, i) {
        changes['rows[' + i + '].' + id] = '';
      });
      this.set(changes);
    }

    else {
      this.addRow();
    }
  },

  addColumns: function (columns) {
    var self = this;
    columns.forEach(function (column) {
      self.addColumn(column);
    });
  },

  destroyColumn: function (id) {
    var id = '_' + id;
    var columns = this.get('columns');
    columns.forEach(function (column, i) {
      if (id === column.id) delete columns[i];
    });

    var rows = this.get('rows');
    rows.forEach(function (row, i) {
      delete rows[i][id];
    });

    this.update();
  },

  addRow: function () {
    var row = {};
    this.get('columns').forEach(function (column) {
      row[column.id] = '';
    });
    this.push('rows', row);
  },

  addRows: function (rows) {
    var self = this;
    rows.forEach(function (row) {
      self.addRow(row);
    });
  },

  destroyRow: function (index) {
    var rows = this.get('rows');
    rows.forEach(function (row, i) {
      if (index === i) rows.splice(index, 1);
    });
  },

  clear: function () {
    this.set('columns', []);
    this.set('rows', []);
    this.set('columnIdByName', {});
  },

  toJSON: function (cb) {
    var ret = [];
    var rows = this.get('rows');
    var columns = this.get('columns');
    var columnIdByName = this.get('columnIdByName');

    rows.forEach(function (row, i) {
      var newRow = {};

      columns.forEach(function(column) {
        newRow[column.name] = row[column.id];
      });

      ret.push(newRow);
    });
    return JSON.stringify(ret);
  }
});
