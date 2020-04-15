Feature: Creating An Action
  The create book process allows the user to define an action mechanic.

  Example: Navigating to the Create Action Page
    When I visit the "Actions index" page
    And  I click the "Create Action" link
    Then I should be on the "Actions create" page

  Rule: Creating an Action
    Example: With Invalid Attributes
      When  I visit the "Actions create" page
      And   I submit the "Action" form with invalid attributes
      Then  I should be on the "Actions create" page
      And   the "Action" form should display the data
      And   the "Action" form should display the errors

    Example: With Valid Attributes
      When  I visit the "Actions create" page
      And   I submit the "Action" form with valid attributes
      Then  I should be on the "Show" page for "Action" "Self-Destruct"
      And   the "Action" block should display the data
