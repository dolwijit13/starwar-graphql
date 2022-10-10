import path from "path";

const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
};
