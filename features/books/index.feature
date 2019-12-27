Feature: Showing Books
  The books index provides a tabular view of the defined book objects.

  Example: Navigating to the Books Index Page
    When I open the application
    And I click the "Books" link
    Then I should be on the "Books index" page

  Rule: Viewing the Books
    Example: When There Are No Books
      When I visit the "Books index" page
      Then the Books table should be empty

    Example: When There Are Many Books
      Given the fixtures are loaded
      When I visit the "Books index" page
      Then the Books table should display the books data