Feature: Destroying A Book
  The destroy book process allows the user to delete an existing book object.

  Rule: Destroying a Book
    Example: From The Books Index Page
      Given the fixtures are loaded
      When  I visit the "Books index" page
      And   I click the "Delete" button for "Book" "Crime in Flumphtownville"
      And   I wait for 1 second
      Then  I should be on the "Books index" page
      And   the "Books" table should display the data
      And   the "Books" table should not display the data for the resource

    Example: From the Show Book Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Book" "Crime in Flumphtownville"
      And   I click the "Delete Book" button
      Then  I should be on the "Books index" page
      And   the "Books" table should display the data
      And   the "Books" table should not display the data for the resource
