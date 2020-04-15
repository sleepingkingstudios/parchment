Feature: Showing A Spell
  The spells page provides a block view of a defined spell object.

  Example: Navigating to the Show Spell Page
    Given the fixtures are loaded
    When I visit the "Spells index" page
    And I click the "Show" link for "Spell" "Flumph Lantern"
    Then I should be on the "Show" page for the "Spell"

  Rule: Viewing the Spell
    Example: When The Spell Does Not Exist
      When I visit the "Show" page for "Spell" "Flumph Lantern"
      Then I should be on the "Spells index" page

    Example: When The Spell Exists
      Given the fixtures are loaded
      When I visit the "Show" page for "Spell" "Flumph Lantern"
      Then I should be on the "Show" page for the "Spell"
      And  the "Spell" block should display the data
