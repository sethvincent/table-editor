var TableEditor = require('../index');

var editor = new TableEditor();

editor.on('import', function () {
  console.log('imported')
})

editor.import([
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' },
  { example: 'weeeee', wat: 'wooooo' }
]);

