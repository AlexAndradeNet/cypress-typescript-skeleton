class HomePage {
    static searchButton(): string {
        return '#search-toggle';
    }

    static homeLogo(): string {
        return '.custom-logo-link';
    }

    static searchTextbox(): string {
        return '#search-form-2';
    }

    static searchSubmitButton(): string {
        return '#header-search > form > .search-submit';
    }

    static newsletterLink(): string {
        return 'Newsletter';
    }

    clickOnSearchButton(): HomePage {
        cy.get(HomePage.searchButton()).click();
        cy.get('#header-search').invoke('css', 'display', 'block');
        return this;
    }

    typeOnSearchTextbox(text: string): HomePage {
        cy.get(HomePage.searchTextbox()).type(text);
        return this;
    }

    clickOnSubmitSearchButton(): HomePage {
        cy.get(HomePage.searchSubmitButton()).click();
        return this;
    }

    clickOnNewsletterLink(): HomePage {
        cy.findByRole('link', { name: HomePage.newsletterLink() }).click();
        return this;
    }
}

export default HomePage;
