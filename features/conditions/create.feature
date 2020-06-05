Feature: Creating A Condition
  The create condition process allows the user to define a condition mechanic.

  Example: Navigating to the Create Condition Page
    When I visit the "Conditions index" page
    And  I am logged in as a user
    And  I click the "Create Condition" link
    Then I should be on the "Conditions create" page

  Rule: Creating a Condition
    Example: As An Anonymous User
      When I visit the "Conditions create" page
      And  I am not logged in
      Then I should see the Login form

    Example: With Invalid Attributes
      When I visit the "Conditions create" page
      And  I am logged in as a user
      And  I submit the "Condition" form with invalid attributes
      Then I should be on the "Conditions create" page
      And  the "Condition" form should display the data
      And  the "Condition" form should display the errors

    Example: With Valid Attributes
      When I visit the "Conditions create" page
      And  I am logged in as a user
      And  I submit the "Condition" form with valid attributes
      Then I should be on the "Show" page for "Condition" "Lethargy"
      And  the "Condition" block should display the data
