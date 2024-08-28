import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import SearchPage from '../../pages/search/search-page';

When('User must open the top result of the search', () => {
    cy.get(SearchPage.getEntryTitles()).eq(0).click();
});

Then('User should be redirected to the corresponding page', () => {
    cy.url().then(currentUrl => {
        const expectedUrl: string =
            '/reed-jobs-hijo-steve-jobs-yosemite-nuevos-tratamientos-cancer';

        expect(currentUrl).to.include(expectedUrl);
    });
});
