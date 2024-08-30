/* eslint-disable */

const { Configuration, defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
    addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
    defaultCommandTimeout: process.env.CI ? 20000 : 10000,
    viewportWidth: 1200,
    viewportHeight: 1000,
    e2e: {
        specPattern: '**/*.feature',
        async setupNodeEvents(
                on,
                config,
        ) {
            // Add Cucumber Preprocessor Plugin
            await addCucumberPreprocessorPlugin(on, config);

            // Add file preprocessor bundler
            on('file:preprocessor', createBundler({
                plugins: [createEsbuildPlugin(config)],
            }));

            return config;
        },
        env: {
            omitFiltered: true,
            filterSpecs: true,
            CI:process.env.CI
        },
        fixturesFolder: false,
        chromeWebSecurity: false,
        baseUrl: 'https://hipertextual.com/',
    },
});
