const path = require('path');
const { CliHelper } = require('@kuscamara/cli-helper');
const copyTemplateDir = require('copy-template-dir');
const { promisify } = require('util');
const copyAsync = promisify(copyTemplateDir);

class Generator {
  constructor({
    description = '',
    defaultCommandMessage = 'Choose a generator',
    commands,
  }) {
    this._templates = this._getTemplates(commands);
    this._cli = new CliHelper({
      description,
      defaultCommandMessage,
      commands: this._getCommands(commands),
    });
  }

  run() {
    this._cli.run();
  }

  _getTemplates(commandOptions) {
    const templates = {};
    const commandsArray = Object.entries(commandOptions);

    for (const [command, options] of commandsArray) {
      templates[command] = path.join(__dirname, options.templates);
    }

    return templates;
  }

  _getCommands(commandOptions) {
    const commands = {};
    const commandsArray = Object.entries(commandOptions);

    for (const [command, options] of commandsArray) {
      this._templateVars = options.templateVars;

      commands[command] = {
        ...options,
        action: this._createPackage(command),
      };
    }

    return commands;
  }

  _createPackage(type) {
    return async ({ options }) => {
      await this._writePackage(type, options);
    };
  }

  async _writePackage(type, options) {
    const src = this._templates[type];
    const dest = path.join(process.cwd(), options.name);
    const templateVars = {
      ...options,
      ...(this._templateVars ? this._templateVars(options) : {}),
    };

    await copyAsync(src, dest, templateVars);
  }
}

module.exports = {
  Generator,
};
