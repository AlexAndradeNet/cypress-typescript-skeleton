Feature: Blankfactor Test

    Background:
        Given User must launch home page

        @skip
    Scenario: User is able to subscribe to the Newsletter
        When User must open the newsletter page
        Then User should be able to subscribe to the Newsletter

    Scenario: Search post about "Reed Jobs"
        When User must search "Reed Jobs"
        And User must open the top result of the search
        Then User should be redirected to the corresponding page
