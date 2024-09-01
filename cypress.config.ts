import { defineConfig } from 'cypress';
import { writeFileSync } from 'fs';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import {
    addCucumberPreprocessorPlugin,
    afterRunHandler,
} from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
    defaultCommandTimeout: process.env.CI != null ? 20000 : 10000,
    viewportWidth: 1200,
    viewportHeight: 1000,
    e2e: {
        specPattern: '**/*.feature',
        async setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ): Promise<Cypress.PluginConfigOptions> {
            // Add Cucumber Preprocessor Plugin
            await addCucumberPreprocessorPlugin(on, config);

            // Add file preprocessor bundler
            on(
                'file:preprocessor',
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            on(
                'after:run',
                async (
                    results:
                        | CypressCommandLine.CypressRunResult
                        | CypressCommandLine.CypressFailedRunResult
                ): Promise<void> => {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    if (results) {
                        await afterRunHandler(config);
                        writeFileSync(
                            '.run/reports/results.json',
                            JSON.stringify(results)
                        );
                    }
                }
            );

            return config;
        },
        env: {
            omitFiltered: true,
            filterSpecs: true,
            CI: process.env.CI,
        },
        fixturesFolder: false,
        chromeWebSecurity: false,
        baseUrl: 'https://hipertextual.com/',
    },
});
