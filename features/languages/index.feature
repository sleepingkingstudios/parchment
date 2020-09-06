@index @languages @reference
Feature: Showing Languages
  The languages index provides a tabular view of the defined skill objects.

  Example: Navigating to the Languages Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Languages" link
    Then I should be on the "Languages index" page

  Rule: Viewing the Languages
    @authentication
    Example: As An Anonymous User
      When I visit the "Languages index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Languages
      When I visit the "Languages index" page
      And  I am logged in as a user
      Then the "Languages" table should be empty

    @core
    Example: When There Are Many Languages
      Given the fixtures are loaded
      When  I visit the "Languages index" page
      And   I am logged in as a user
      Then  the "Languages" table should display the data
