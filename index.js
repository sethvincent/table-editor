var removeElement = require('remove-element');
var Ractive = require('ractive');
require('Ractive-decorators-sortable');

module.exports = Ractive.extend({

  onrender: function (asd) {
    var self = this;
    this.set('uid', 0);

    this.on('dragenter', function () {
      /* 
      * Wow this is a nasty hack that probably won't scale.
      * But for some reason <td> elements of the row being indirectly 
      * moved disappear on dragenter.
      */
      self.forceUpdate();
    });
  },

  import: function (items) {
    var self = this;
    var columns = [];
    var columnIdByName = {};

    items.forEach( function (item) {
      Object.keys(item).forEach( function ( name ) {
        var columnId;

        if (!columnIdByName[name]) {
          columnId = '_' + self.get('uid');
          self.add('uid');

          columnIdByName[name] = columnId;

          columns.push({
            id: columnId,
            name: name,
            type: 'string',
            defaultValue: function () { return null; }
          });
        }
      });
    });

    rows = items.map(function (item) {
      var row = {};

      Object.keys(columnIdByName).forEach(function (name) {
        if (!item[name]) item[name] = ' ';
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

    var id = '_' + this.get('uid');
    this.add('uid');

    this.push('columns', {
      id: id,
      name: column.name,
      type: column.type || 'string'
    });

    this.set('columnIdByName.' + column.name, id);

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
    if (process.browser) removeElement(document.getElementById(id));

    var columnIdByName = this.get('columnIdByName');
    var columns = this.get('columns');
    var rows = this.get('rows');

    columns.forEach(function (column, i) {
      if (id === column.id) {
        columns.splice(i, 1);
        delete columnIdByName[column.name];
      }
    });

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
      if (parseInt(index) === i) rows.splice(index, 1);
    });
  },

  destroyRows: function () {
    this.set('rows', []);
  },

  clear: function () {
    this.set('uid', 0);
    this.set('columns', []);
    this.set('rows', []);
    this.set('columnIdByName', {});
  },

  getRows: function () {
    var ret = [];
    var rows = this.get('rows');
    var columns = this.get('columns');

    rows.forEach(function (row, i) {
      var newRow = {};

      columns.forEach(function(column) {
        newRow[column.name] = row[column.id];
      });

      ret.push(newRow);
    });

    return ret;
  },

  toJSON: function (indent) {
    var data = {
      name: this.get('name'),
      description: this.get('description'),
      publisher: this.get('publisher'),
      rows: this.getRows()
    }
    return JSON.stringify(data, null, indent);
  },

  /* 
  * Wow this is a nasty hack that probably won't scale.
  * But for some reason <td> elements of the row being indirectly 
  * moved disappear on dragenter.
  */

  forceUpdate: function (rows) {
    if (!rows) var rows = this.getRows();
    this.clear();
    this.import(rows);
  }

});
