Feature: Showing A Condition
  The condition page provides a block view of a defined condition object.

  Example: Navigating to the Show Condition Page
    Given the fixtures are loaded
    When  I visit the "Conditions index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Condition" "Zombie"
    Then  I should be on the "Show" page for the "Condition"

  Rule: Viewing the Condition
    Example: As An Anonymous User
      When I visit the "Show" page for "Condition" "Zombie"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Condition Does Not Exist
      When I visit the "Show" page for "Condition" "Zombie"
      And  I am logged in as a user
      Then I should be on the "Conditions index" page

    Example: When The Condition Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Condition" "Zombie"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Condition"
      And   the "Condition" block should display the data
