Feature: Updating A Book
  The update book process allows the user to modify an existing book object.

  Rule: Navigating to the Update Book Page
    Example: From The Books Index Page
      Given the fixtures are loaded
      When I visit the "Books index" page
      And I click the "Update" link for book "Crime in Flumphtownville"
      Then I should be on the "Update" page for the book

    Example: From The Show Book Page
      Given the fixtures are loaded
      When I visit the "Show" page for book "Crime in Flumphtownville"
      And  I click the "Update Book" link
      Then I should be on the "Update" page for the book

  Rule: Updating the Book
    Example: When The Book Does Not Exist
      When I visit the "Update" page for book "Crime in Flumphtownville"
      Then I should be on the "Books index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for book "Crime in Flumphtownville"
      And   I submit the Book form with invalid attributes
      Then  I should be on the "Update" page for the book
      And   the Book form should display the book data
      And   the Book form should display the errors

    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for book "Crime in Flumphtownville"
      And   I submit the Book form with valid attributes
      Then  I should be on the "Show" page for book "Blasto the Flumph Spectre"
      And   the Book block should display the book data
