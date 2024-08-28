import './commands';

Cypress.on(
    'uncaught:exception',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, runnable: Mocha.Runnable): boolean => false
);

// before(() => {
//   // Hook
// });

// afterEach(() => {
//   // Hook
// });

// after(() => {
//   // Hook
// });
