import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/home/home-page';

Given('User must launch home page', () => {
    cy.visit('/');
});

Given('User must search {string}', (text: string) => {
    cy.wrap(text).as('searchedValue');
    cy.get(HomePage.searchButton()).click();
    cy.get(HomePage.searchTextbox()).type(text);
    cy.get(HomePage.searchSubmitButton()).click();
});

When('User must open the newsletter page', () => {
    cy.findByRole('link', { name: HomePage.newsletterLink() }).click();
});

Then('Should display Home page', () => {
    cy.get(HomePage.searchButton()).click();
});
