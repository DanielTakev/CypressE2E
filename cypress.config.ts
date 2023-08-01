import { defineConfig } from 'cypress'
const setupNodeEvents = require('./cypress/plugins/e2e.js')
require('cypress-high-resolution')

export default defineConfig({
  e2e: {
    "env": {
      "resolution": "high"
    },
    setupNodeEvents,
    "baseUrl": "https://localhost:8443/",
    "chromeWebSecurity": false,
    "videoUploadOnPasses": false,
    "screenshotOnRunFailure": true,
    "includeShadowDom": true,
    "screenshotsFolder": "e2e/TestReport/assets",
    "videosFolder": "e2e/videos",
    "viewportWidth": 1900,
    "viewportHeight": 1200,
    "defaultCommandTimeout": 6500,
    "retries": 2,
    "reporter": "cypress-multi-reporters",
    "supportFile": false,
    "modifyObstructiveCode": false,
    "specPattern": "./cypress/e2e/specs",
    "reporterOptions": {
      "reporterEnabled": "mochawesome, mocha-junit-reporter",
      "mochawesomeReporterOptions": {
        "reportDir": "e2e/mochawesome-report",
        "overwrite": false,
        "html": false,
        "json": true,
        "screenshotOnRunFailure": true
      },
      "mochaJunitReporterReporterOptions": {
        "mochaFile": "e2e/junit-report/my-test-output-[hash].xml",
        "toConsole": false
      }
    }
  } } as any)
  