// const config = {
//   moduleFileExtensions: ["js", "json", "ts"],
//   rootDir: ".",
//   testRegex: ".*\\.spec\\.ts$",
//   preset: "ts-jest",
//   // transform: {
//   //   "^.+\\.(t|j)s$": "ts-jest",
//   // },
//   collectCoverageFrom: ["**/*.(t|j)s"],
//   coverageDirectory: "./coverage",
//   testEnvironment: "node",
//   // setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
//   moduleNameMapper: {
//     "^src/(.*)$": "<rootDir>/src/$1",
//   },
//   modulePaths: ["."],
// };
//
// export default config;

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  clearMocks: true,
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
    transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  modulePaths: ["."],
  rootDir: ".",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  transformIgnorePatterns: [
    "node_modules/(?!uuid)", // 👈 force Jest to transpile uuid
  ],
};

module.exports = config;
