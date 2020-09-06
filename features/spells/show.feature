@reference @show @spells
Feature: Showing A Spell
  The spells page provides a block view of a defined spell object.

  Example: Navigating to the Show Spell Page
    Given the fixtures are loaded
    When  I visit the "Spells index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Spell" "Flumph Lantern"
    Then  I should be on the "Show" page for the "Spell"

  Rule: Viewing the Spell
    @authentication
    Example: As An Anonymous User
      When I visit the "Show" page for "Spell" "Flumph Lantern"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Spell Does Not Exist
      When I visit the "Show" page for "Spell" "Flumph Lantern"
      And  I am logged in as a user
      Then I should be on the "Spells index" page

    @core
    Example: When The Spell Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Spell" "Flumph Lantern"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Spell"
      And   the "Spell" block should display the data
