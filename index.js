var View = require('ractive');
var uid = 0;

module.exports = View.extend({

  init: function (opts) {
    this.template = View.parse(opts.template);
    this.set(uid, 0);
  },

  import: function (items) {
    var columns = [];
    var columnIdByName = {};

    items.forEach( function ( record ) {
      Object.keys( record ).forEach( function ( name ) {
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
        row[columnIdByName[name]] = record[name];
      });

      return row;
    });

    this.set({
      columns: columns,
      columnIdByName: columnIdByName,
      rows: rows
    });
  },

  reset: function () {
    this.set({ headers: [], rows: [] });
  },

  addColumn: function (column) {

  },

  addColumns: function (columns) {
    columns.forEach( function (column) {
      Object.keys(column).forEach(function (name) {
        var id;


      });
    });
  },

  destroyColumn: function (id) {

  },

  addRow: function (row) {

  },

  addRows: function (rows) {

  },

  destroyRow: function (index) {

  },

  toJSON: function (cb) {

  }

});
