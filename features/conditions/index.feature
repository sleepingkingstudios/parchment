@conditions @index @mechanics @reference
Feature: Showing Conditions
  The actions index provides a tabular view of the defined action objects.

  Example: Navigating to the Conditions Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Conditions" link
    Then I should be on the "Conditions index" page

  Rule: Viewing the Conditions
    @authentication
    Example: As An Anonymous User
      When I visit the "Conditions index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Conditions
      When I visit the "Conditions index" page
      And  I am logged in as a user
      Then the "Conditions" table should be empty

    @core
    Example: When There Are Many Conditions
      Given the fixtures are loaded
      When  I visit the "Conditions index" page
      And   I am logged in as a user
      Then  the "Conditions" table should display the data
