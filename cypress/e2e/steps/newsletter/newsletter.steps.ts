import { Then } from '@badeball/cypress-cucumber-preprocessor';
import NewsletterPage from '../../pages/newsletter/newsletter-page';
import generateRandomEmail from '../../../support/utils/commonFunctions';

Then('User should be able to subscribe to the Newsletter', () => {
    cy.iframe().within($iframe => {
        cy.wrap($iframe)
            .find(NewsletterPage.emailInput())
            .invoke('removeAttr', 'disabled')
            .type(`${generateRandomEmail()}`);
        cy.wrap($iframe)
            .find(NewsletterPage.submitButton())
            .invoke('removeAttr', 'target')
            .click();
    });

    cy.on('window:alert', alertText => {
        expect(alertText).to.contain('completar tu suscripción');
    });
});
