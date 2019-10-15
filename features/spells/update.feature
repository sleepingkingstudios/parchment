Feature: Updating A Spell
  The update spell process allows the user to modify an existing spell object.

  Example: Navigating to the Update Spell Page
    Given the fixtures are loaded
    When I visit the "Spells index" page
    And I click the "Update" link for spell "Flumph Lantern"
    Then I should be on the "Update" page for the spell

  Rule: Updating the Spell
    Example: When The Spell Does Not Exist
      When I visit the "Update" page for spell "Flumph Lantern"
      Then I should be on the "Spells index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for spell "Flumph Lantern"
      And   I submit the Spell form with invalid attributes
      Then  I should be on the "Update" page for the spell
      And   the Spell form should display the spell data
      And   the Spell form should display the errors
