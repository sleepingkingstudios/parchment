Feature: Updating A Book
  The update book process allows the user to modify an existing book object.

  Rule: Navigating to the Update Book Page
    Example: From The Books Index Page
      Given the fixtures are loaded
      When  I visit the "Books index" page
      And   I am logged in as a user
      And   I click the "Update" link for "Book" "Crime in Flumphtownville"
      Then  I should be on the "Update" page for the "Book"

    Example: From The Show Book Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Book" "Crime in Flumphtownville"
      And   I am logged in as a user
      And   I click the "Update Book" link
      Then  I should be on the "Update" page for the "Book"

  Rule: Updating the Book
    Example: As An Anonymous User
      When I visit the "Update" page for "Book" "Crime in Flumphtownville"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Book Does Not Exist
      When I visit the "Update" page for "Book" "Crime in Flumphtownville"
      And  I am logged in as a user
      Then I should be on the "Books index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Book" "Crime in Flumphtownville"
      And   I am logged in as a user
      And   I submit the "Book" form with invalid attributes
      Then  I should be on the "Update" page for the "Book"
      And   the "Book" form should display the data
      And   the "Book" form should display the errors

    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Book" "Crime in Flumphtownville"
      And   I am logged in as a user
      And   I submit the "Book" form with valid attributes
      Then  I should be on the "Show" page for "Book" "Blasto the Flumph Spectre"
      And   the "Book" block should display the data
