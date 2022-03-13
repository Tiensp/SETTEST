import { Config } from '@jest/types';

const options: Config.InitialOptions = {

  preset: "ts-jest",

  testEnvironment: "node",

  testTimeout: 10000,

  roots: [
    "<rootDir>/tests"
  ],

  testRegex: "\\.spec\\.tsx?$",

  setupFiles: ["<rootDir>/tests/setup.ts"],


  moduleNameMapper: {
    "^client\\/(.*)$": "<rootDir>/src/client/$1",
    "^server\\/(.*)$": "<rootDir>/src/server/$1",
    "^shared\\/(.*)$": "<rootDir>/src/shared/$1",

    '\\.(jpe?g|png|gif|svg|woff2?|eot|ttf|otf)$': '<rootDir>/tests/_fixtures/empty-string.ts',
    "\\.(css|scss)$": "<rootDir>/tests/_fixtures/styleMock.ts"
  }

}

export default options;