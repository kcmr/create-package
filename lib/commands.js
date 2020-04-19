const commonParams = {
  scope: {
    message: 'Scope for the npm package (leave empty for no scope)',
    type: 'string',
  },
  description: {
    message: 'Package description',
    type: 'string',
  },
  githubUser: {
    message: 'Github user',
    type: 'string',
  },
  author: {
    message: 'Author (used in package.json and LICENSE)',
    type: 'string',
  },
};

function getParams(nameMessage) {
  return {
    name: {
      message: nameMessage,
      type: 'string',
    },
    ...commonParams,
  };
}

function getPackageScope(value) {
  return value.charAt(0) === '@' ? value : `@${value}`;
}

function getPackageName({ name, scope }) {
  return scope ? `${getPackageScope(scope)}/${name}` : name;
}

function getTemplateVars(options) {
  return {
    pkgName: getPackageName(options),
  };
}

module.exports = {
  'NPM Package': {
    desc: 'Creates a generic npm package',
    params: getParams('Package name'),
    templates: '../templates/npm-package',
    templateVars: getTemplateVars,
  },

  'Babel Plugin': {
    desc: 'Creates a Babel plugin',
    params: getParams('Plugin name'),
    templates: '../templates/babel-plugin',
    templateVars: getTemplateVars,
  },
};
