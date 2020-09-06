@books @show @sources
Feature: Showing A Book
  The spells page provides a block view of a defined book object.

  Example: Navigating to the Show Book Page
    Given the fixtures are loaded
    When  I visit the "Books index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Book" "Crime in Flumphtownville"
    Then  I should be on the "Show" page for the "Book"

  Rule: Viewing the Book
    @authentication
    Example: As An Anonymous User
      When I visit the "Show" page for "Book" "Great Flumphs of History"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Book Does Not Exist
      When I visit the "Show" page for "Book" "Great Flumphs of History"
      And  I am logged in as a user
      Then I should be on the "Books index" page

    @core
    Example: When The Book Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Book" "Crime in Flumphtownville"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Book"
      And   the "Book" block should display the data
