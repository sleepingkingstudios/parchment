@actions @index @mechanics @reference
Feature: Showing Actions
  The actions index provides a tabular view of the defined action objects.

  Example: Navigating to the Actions Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Actions" link
    Then I should be on the "Actions index" page

  Rule: Viewing the Actions
    @authentication
    Example: As An Anonymous User
      When I visit the "Actions index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Actions
      When I visit the "Actions index" page
      And  I am logged in as a user
      Then the "Actions" table should be empty

    @core
    Example: When There Are Many Actions
      Given the fixtures are loaded
      When  I visit the "Actions index" page
      And   I am logged in as a user
      Then  the "Actions" table should display the data
