@conditions @destroy @mechanics @reference
Feature: Destroying A Condition
  The destroy condition process allows the user to delete an existing condition object.

  Rule: Destroying a Condition
    Example: From The Conditions Index Page
      Given the fixtures are loaded
      When  I visit the "Conditions index" page
      And   I am logged in as a user
      And   I click the "Delete" button for "Condition" "Zombie"
      And   I wait for 1 second
      Then  I should be on the "Conditions index" page
      And   the "Conditions" table should display the data
      And   the "Conditions" table should not display the data for the resource

    @core
    Example: From the Show Condition Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Condition" "Zombie"
      And   I am logged in as a user
      And   I click the "Delete Condition" button
      Then  I should be on the "Conditions index" page
      And   the "Conditions" table should display the data
      And   the "Conditions" table should not display the data for the resource
