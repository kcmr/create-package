const { createPackage } = require('./create-package');

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

module.exports = {
  'NPM Package': {
    desc: 'Creates a generic npm package',
    params: getParams('Package name'),
    action: createPackage('npm'),
  },

  'Babel Plugin': {
    desc: 'Creates a Babel plugin',
    params: getParams('Plugin name'),
    action: createPackage('babel'),
  },
};
