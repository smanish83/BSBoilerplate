module.exports = {
  hooks: {
    'pre-commit':
      'npx eslint . --ext .js && npm test -- --changedSince=develop',
  },
};