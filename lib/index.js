const { CliHelper } = require('@kuscamara/cli-helper');
const commands = require('./commands');

const cli = new CliHelper({
  description: 'NPM package generator',
  defaultCommandMessage: 'Choose a generator',
  commands,
});

cli.run();
