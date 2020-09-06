@create @reference @spells
Feature: Creating A Spell
  The create spell process allows the user to define a spell object.

  Example: Navigating to the Create Spell Page
    When I visit the "Spells index" page
    And  I am logged in as a user
    And  I click the "Create Spell" link
    Then I should be on the "Spells create" page

  Rule: Creating a Spell
    @authentication
    Example: As An Anonymous User
      When I visit the "Spells create" page
      And  I am not logged in
      Then I should see the Login form

    Example: With Invalid Attributes
      When I visit the "Spells create" page
      And  I am logged in as a user
      And  I submit the "Spell" form with invalid attributes
      Then I should be on the "Spells create" page
      And  the "Spell" form should display the data
      And  the "Spell" form should display the errors

    @core
    Example: With Valid Attributes
      When I visit the "Spells create" page
      And  I am logged in as a user
      And  I submit the "Spell" form with valid attributes
      Then I should be on the "Show" page for "Spell" "Magic Noodle"
      And  the "Spell" block should display the data

    Example: With Valid Attributes And A Source
      Given the fixtures are loaded
      When  I visit the "Spells create" page
      And   I am logged in as a user
      And   I select the source "Book" "Secrets of the Flumph" for the "Spell"
      And   I submit the "Spell" form with valid attributes
      Then  I should be on the "Show" page for "Spell" "Magic Noodle"
      And   the "Spell" block should display the data
      And   the "Spell" block should show source "Secrets of the Flumph"
