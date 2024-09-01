/* eslint-disable */
const { generate } = require('multiple-cucumber-html-reporter');
const dayjs = require('dayjs');
const { readFileSync } = require('fs');

// Read and parse the JSON data from the results file
const data = readFileSync('./.run/reports/results.json', {
    encoding: 'utf8',
    flag: 'r',
});

let runInfos;
try {
    runInfos = JSON.parse(data);
} catch (error) {
    console.error('Error parsing JSON data:', error);
    process.exit(1); // Exit if JSON parsing fails
}

// Function to map the operating system to a standardized format
function mapOs(os) {
    if (typeof os === 'string') {
        if (os.startsWith('win')) return 'windows';
        if (os.startsWith('darwin')) return 'osx';
        if (os.startsWith('linux')) return 'linux';
        if (os.startsWith('ubuntu')) return 'ubuntu';
        if (os.startsWith('android')) return 'android';
        if (os.startsWith('ios')) return 'ios';
    }

    return `Unsupported OS: ${os}`;
}

// Generate the HTML report using multiple-cucumber-html-reporter
generate({
    jsonDir: './.run/reports/cucumber-json/', // Directory containing JSON files
    reportPath: './.run/reports/cucumber-html/', // Directory to save the HTML report
    openReportInBrowser: true, // Automatically open the report in the browser
    ignoreBadJsonFile: true,
    metadata: {
        browser: {
            name: runInfos.browserName === 'chromium' ? 'chrome' : runInfos.browserName,
            version: runInfos.browserVersion,
        },
        platform: {
            name: mapOs(runInfos.osName),
            version: runInfos.osVersion,
        },
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project', value: 'Cypress Skeleton ' },
            { label: 'Release', value: '1.0.0' },
            { label: "Cypress Version", value: runInfos["cypressVersion"] },
            { label: "Node Version", value: runInfos.config["resolvedNodeVersion"] },
            {
                label: 'Execution Start Time',
                value: dayjs(runInfos.startedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
            },
            {
                label: 'Execution End Time',
                value: dayjs(runInfos.endedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
            },
        ],
    },
    pageTitle: 'Cypress skeleton',
    reportName: 'Cypress skeleton',
    displayDuration: true,
    displayReportTime: true,
});
