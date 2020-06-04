Feature: Creating An Action
  The create action process allows the user to define an action mechanic.

  Example: Navigating to the Create Action Page
    When I visit the "Actions index" page
    And  I am logged in as a user
    And  I click the "Create Action" link
    Then I should be on the "Actions create" page

  Rule: Creating an Action
    Example: As An Anonymous User
      When I visit the "Actions create" page
      And  I am not logged in
      Then I should see the Login form

    Example: With Invalid Attributes
      When I visit the "Actions create" page
      And  I am logged in as a user
      And  I submit the "Action" form with invalid attributes
      Then I should be on the "Actions create" page
      And  the "Action" form should display the data
      And  the "Action" form should display the errors

    Example: With Valid Attributes
      When I visit the "Actions create" page
      And  I am logged in as a user
      And  I submit the "Action" form with valid attributes
      Then I should be on the "Show" page for "Action" "Self-Destruct"
      And  the "Action" block should display the data
