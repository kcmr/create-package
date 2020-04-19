const { Generator } = require('./Generator');
const commands = require('./commands');

const cli = new Generator({
  description: 'NPM package generator',
  defaultCommandMessage: 'Choose a generator',
  commands,
});

cli.run();
