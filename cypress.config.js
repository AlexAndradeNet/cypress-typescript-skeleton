/* eslint-disable */
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
    addCucumberPreprocessorPlugin
} = require("@badeball/cypress-cucumber-preprocessor");
const {
    createEsbuildPlugin
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
    defaultCommandTimeout: 30000,
    screenshotOnRunFailure: false,
    screenshotsFolder: "cypress/screenshots",
    video: false,
    trashAssetsBeforeRuns: true,
    viewportWidth: 1200,
    viewportHeight: 1000,
    retries: {
        runMode: 1,
        openMode: 0
    },
    e2e: {
        async setupNodeEvents(on, config) {
            const bundler = createBundler({ plugins: [createEsbuildPlugin(config)] });
            config.baseUrl = process.env.base_url;

            on("file:preprocessor", bundler);
            await addCucumberPreprocessorPlugin(on, config);

            return config;
        },
        specPattern: [
            "cypress/e2e/features/*.feature",
            "cypress/e2e/features/*/*.feature"
        ],
        baseUrl: "https://hipertextual.com/",
        chromeWebSecurity: false,
        experimentalModifyObstructiveThirdPartyCode: true
    }
});
