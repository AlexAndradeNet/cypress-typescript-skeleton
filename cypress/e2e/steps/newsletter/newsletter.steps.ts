import { Then } from '@badeball/cypress-cucumber-preprocessor';
import NewsletterPage from '../../pages/newsletter/newsletter-page';
import generateRandomEmail from '../../../support/utils/commonFunctions';

Then('User should be able to subscribe to the Newsletter', () => {
    cy.iframe().within($iframe => {
        cy.wrap($iframe)
            .get(NewsletterPage.emailInput())
            .invoke('removeAttr', 'disabled')
            .type(`${generateRandomEmail()}`);
        cy.wrap($iframe)
            .get(NewsletterPage.submitButton())
            .invoke('removeAttr', 'target')
            .click();
    });

    cy.on('window:alert', alertText => {
        expect(alertText).to.contains('completar tu suscripción');
    });
});
