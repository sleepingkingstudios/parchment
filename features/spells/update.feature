@reference @spells @update
Feature: Updating A Spell
  The update spell process allows the user to modify an existing spell object.

  Rule: Navigating to the Update Spell Page
    Example: From The Spells Index Page
      Given the fixtures are loaded
      When  I visit the "Spells index" page
      And   I am logged in as a user
      And   I click the "Update" link for "Spell" "Flumph Lantern"
      Then  I should be on the "Update" page for the "Spell"

    Example: From The Show Spell Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Spell" "Flumph Lantern"
      And   I am logged in as a user
      And   I click the "Update Spell" link
      Then  I should be on the "Update" page for the "Spell"

  Rule: Updating the Spell
    @authentication
    Example: As An Anonymous User
      When I visit the "Update" page for "Spell" "Flumph Lantern"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Spell Does Not Exist
      When I visit the "Update" page for "Spell" "Flumph Lantern"
      And  I am logged in as a user
      Then I should be on the "Spells index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Spell" "Flumph Lantern"
      And   I am logged in as a user
      And   I submit the "Spell" form with invalid attributes
      Then  I should be on the "Update" page for the "Spell"
      And   the "Spell" form should display the data
      And   the "Spell" form should display the errors

    @core
    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Spell" "Flumph Lantern"
      And   I am logged in as a user
      And   I submit the "Spell" form with valid attributes
      Then  I should be on the "Show" page for "Spell" "Magic Noodle"
      And   the "Spell" block should display the data

    Example: With Valid Attributes And A Source
      Given the fixtures are loaded
      When  I visit the "Update" page for "Spell" "Flumph Lantern"
      And   I am logged in as a user
      And   I select the source "Book" "Secrets of the Flumph" for the "Spell"
      And   I submit the "Spell" form with valid attributes
      Then  I should be on the "Show" page for "Spell" "Magic Noodle"
      And   the "Spell" block should display the data
      And   the "Spell" block should show source "Secrets of the Flumph"
