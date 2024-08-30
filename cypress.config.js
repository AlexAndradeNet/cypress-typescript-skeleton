/* eslint-disable */

const { Configuration, defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
    addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
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
        },
        fixturesFolder: false,
        chromeWebSecurity: false,
        baseUrl: 'https://hipertextual.com/',
    },
});
