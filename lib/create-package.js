const path = require('path');
const { promisify } = require('util');
const copyTemplateDir = require('copy-template-dir');
const copyAsync = promisify(copyTemplateDir);

const TEMPLATES = {
  npm: path.join(__dirname, '..', 'templates/npm-package'),
  babel: path.join(__dirname, '..', 'templates/babel-plugin'),
};

function getPackageScope(value) {
  return value.charAt(0) === '@' ? value : `@${value}`;
}

function getPackageName({ name, scope }) {
  return scope ? `${getPackageScope(scope)}/${name}` : name;
}

async function writePackage(type, options) {
  const src = TEMPLATES[type];
  const dest = path.join(process.cwd(), options.name);
  const pkgName = getPackageName(options);
  const params = {
    ...options,
    pkgName,
  };

  await copyAsync(src, dest, params);
}

function createPackage(type) {
  return async function({ options }) {
    await writePackage(type, options);
  };
}

module.exports = {
  createPackage,
};
