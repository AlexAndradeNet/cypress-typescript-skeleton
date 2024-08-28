class HomePage {
    static searchButton(): string {
        return '#search-toggle';
        // return '.search-icon > .svg-icon';
        // return '.search-icon';
        // return '.svg-icon';
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
}

export default HomePage;
