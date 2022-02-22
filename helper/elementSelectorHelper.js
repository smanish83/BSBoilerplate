module.exports = {
  getByQa: (name) => `[data-qa="${name}"]`,

  getByCvWithWildcard: (name) => `[data-cv-test*="${name}"]`,

  getByName: (name) => `[name="${name}"]`,

  getByCv: (name) => `[data-cv-test="${name}"]`,
};
