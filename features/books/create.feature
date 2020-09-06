@books @create @sources
Feature: Creating A Book
  The create book process allows the user to define a book object.

  Example: Navigating to the Create Book Page
    When I visit the "Books index" page
    And  I am logged in as a user
    And  I click the "Create Book" link
    Then I should be on the "Books create" page

  Rule: Creating a Book
    @authentication
    Example: As An Anonymous User
      When I visit the "Books create" page
      And  I am not logged in
      Then I should see the Login form

    Example: With Invalid Attributes
      When I visit the "Books create" page
      And  I am logged in as a user
      And  I submit the "Book" form with invalid attributes
      Then I should be on the "Books create" page
      And  the "Book" form should display the data
      And  the "Book" form should display the errors

    @core
    Example: With Valid Attributes
      When I visit the "Books create" page
      And  I am logged in as a user
      And  I submit the "Book" form with valid attributes
      Then I should be on the "Show" page for "Book" "Blasto the Flumph Spectre"
      And  the "Book" block should display the data
