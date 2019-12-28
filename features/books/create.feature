Feature: Creating A Book
  The create book process allows the user to define a book object.

  Example: Navigating to the Create Book Page
    When I visit the "Books index" page
    And  I click the "Create Book" link
    Then I should be on the "Books create" page

  Rule: Creating a Book
    Example: With Invalid Attributes
      When  I visit the "Books create" page
      And   I submit the Book form with invalid attributes
      Then  I should be on the "Books create" page
      And   the Book form should display the book data
      And   the Book form should display the errors

    Example: With Valid Attributes
      When  I visit the "Books create" page
      And   I submit the Book form with valid attributes
      Then  I should be on the "Show" page for book "Blasto the Flumph Spectre"
      And   the Book block should display the book data
