const path = require('path');
const { CliHelper } = require('@kuscamara/cli-helper');
const { promisify } = require('util');
const copyTemplateDir = require('copy-template-dir');
const copyAsync = promisify(copyTemplateDir);

function getBlueprints(options) {
  const blueprints = {};
  const commands = Object.entries(options);

  for (const [command, params] of commands) {
    const template = path.join(__dirname, params.templates);
    const templateVars = params.templateVars;

    blueprints[command] = {
      ...params,
      action: createBlueprint(template, templateVars),
    };
  }

  return blueprints;
}

function createBlueprint(template, templateVars) {
  return async function({ options }) {
    await writeFiles(template, options, templateVars);
  };
}

async function writeFiles(template, options, templateVars) {
  const dest = path.join(process.cwd(), options.name);
  const vars = {
    ...options,
    ...(templateVars ? templateVars(options) : {}),
  };

  await copyAsync(template, dest, vars);
}

class Generator extends CliHelper {
  constructor({
    description = '',
    defaultCommandMessage = 'Choose a generator',
    commands,
  }) {
    super({
      description,
      defaultCommandMessage,
      commands: getBlueprints(commands),
    });
  }
}

module.exports = {
  Generator,
};
