Feature: Destroying A Spell
  The destroy spell process allows the user to delete an existing spell object.

  Rule: Destroying a Spell
    Example: From The Spells Index Page
      Given the fixtures are loaded
      When  I visit the "Spells index" page
      And   I click the "Delete" button for spell "Flumph Lantern"
      And   I wait for 1 second
      Then  I should be on the "Spells index" page
      And   the Spells table should display the spells data
      And   the Spells table should not display the data for the spell

    Example: From the Show Spell Page
      Given the fixtures are loaded
      When  I visit the "Show" page for spell "Flumph Lantern"
      And   I click the "Delete Spell" button
      Then  I should be on the "Spells index" page
      And   the Spells table should display the spells data
      And   the Spells table should not display the data for the spell
