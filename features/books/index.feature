@books @index @sources
Feature: Showing Books
  The books index provides a tabular view of the defined book objects.

  Example: Navigating to the Books Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Books" link
    Then I should be on the "Books index" page

  Rule: Viewing the Books
    @authentication
    Example: As An Anonymous User
      When I visit the "Books index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Books
      When I visit the "Books index" page
      And  I am logged in as a user
      Then the "Books" table should be empty

    @core
    Example: When There Are Many Books
      Given the fixtures are loaded
      When  I visit the "Books index" page
      And   I am logged in as a user
      Then  the "Books" table should display the data
