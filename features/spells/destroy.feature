@destroy @reference @spells
Feature: Destroying A Spell
  The destroy spell process allows the user to delete an existing spell object.

  Rule: Destroying a Spell
    Example: From The Spells Index Page
      Given the fixtures are loaded
      When  I visit the "Spells index" page
      And   I am logged in as a user
      And   I click the "Delete" button for "Spell" "Flumph Lantern"
      And   I wait for 1 second
      Then  I should be on the "Spells index" page
      And   the "Spells" table should display the data
      And   the "Spells" table should not display the data for the resource

    @core
    Example: From the Show Spell Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Spell" "Flumph Lantern"
      And   I am logged in as a user
      And   I click the "Delete Spell" button
      Then  I should be on the "Spells index" page
      And   the "Spells" table should display the data
      And   the "Spells" table should not display the data for the resource
