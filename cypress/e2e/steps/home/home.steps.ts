import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/home/home-page';

const homePage: HomePage = new HomePage();

Given('User must launch home page', () => {
    cy.visit('/');
});

Given('User must search {string}', (text: string) => {
    cy.wrap(text).as('searchedValue');
    homePage.clickOnSearchButton();
    homePage.typeOnSearchTextbox(text);
    homePage.clickOnSubmitSearchButton();
});

When('User must open the newsletter page', () => {
    homePage.clickOnNewsletterLink();
});

Then('Should display Home page', () => {
    homePage.clickOnSearchButton();
});
