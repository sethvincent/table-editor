var removeElement = require('remove-element');
var Ractive = require('ractive');

module.exports = Ractive.extend({

  onrender: function () {
    var self = this;
    var uid = this.get('uid');
    if (!uid) this.set('uid', 0);

    this.on('change', function (change) {
      var self = this;
      
      Object.keys(change).forEach(function (key) {
        var key = key.split('.');
        
        if (key[0] === 'columns') {
          if (key[2] === 'name') self.fire('change:column:name', { key: change[key] });
          if (key[2] === 'type') self.fire('change:column:type', { key: change[key] });
        }

        else if (key[0] === 'rows') {
          
        }
      });
    });
  },

  import: function (items) {
    var self = this;
    var columns = [];
    var columnIdByName = {};
    items = items || [];
    
    var uid = this.get('uid');
    if (!uid) this.set('uid', 0);

    items.forEach(function (item) {
      var row = item.value ? item.value : item
      
      Object.keys(row).forEach(function (name) {
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
      var row = item.value ? item.value : item
      var out = {};

      Object.keys(columnIdByName).forEach(function (name) {
        if (!row[name]) row[name] = null;
        out[columnIdByName[name]] = row[name];
      });

      return out;
    });

    this.set({
      columns: columns,
      columnIdByName: columnIdByName,
      rows: rows
    });

    this.fire('import');
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
        changes['rows[' + i + '].' + id] = null;
      });
      this.set(changes);
    }

    else {
      this.addRow();
    }
    
    this.fire('column:add');
  },

  addColumns: function (columns) {
    var self = this;
    columns.forEach(function (column) {
      self.addColumn(column);
    });
  },
  
  getColumnID: function (name) {
    return this.get('columnIdByName')[name];
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
    this.fire('column:destroy');
  },

  addRow: function (doc) {
    var row = doc ? doc : {};
    
    this.get('columns').forEach(function (column) {
      row[column.id] = row[column.name] || null;
    });
    
    this.push('rows', row);
    this.fire('row:add', row);
  },

  addRows: function (rows) {
    var self = this;
    rows.forEach(function (row) {
      self.addRow(row);
    });
  },

  updateRow: function (id, doc) {
    var row = {};
    
    this.get('columns').forEach(function (column) {
      row[column.id] = doc[column.name] || null;
    });
    
    this.set('rows.'+id, row);
  },

  destroyRow: function (index) {
    var rows = this.get('rows');
    rows.forEach(function (row, i) {
      if (parseInt(index) === i) rows.splice(index, 1);
    });
    this.forceUpdate();
    this.fire('row:destroy');
  },

  destroyRows: function () {
    this.set('rows', []);
  },

  clear: function () {
    this.set('uid', 0);
    this.set('columns', []);
    this.set('rows', []);
    this.set('columnIdByName', {});
    this.fire('clear');
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

  getRow: function (i) {
    var columns = this.get('columns');
    var data = this.get('rows.' + i);
    var row = {};

    columns.forEach(function (column) {
      row[column.name] = data[column.id];
    });

    return row;
  },

  setCell: function (row, column, value) {
    if (column.charAt(0) !== '_') column = this.getColumnID(column);
    return this.set('rows.' + row + '.' + column, value);
  },

  getCell: function (row, column) {
    if (column.charAt(0) !== '_') column = this.getColumnID(column);
    return this.get('rows.' + row + '.' + column);
  },

  toJSON: function (indent) {
    var data = {
      name: this.get('name'),
      description: this.get('description'),
      publisher: this.get('publisher'),
      rows: this.getRows()
    };
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