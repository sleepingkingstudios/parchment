Feature: Showing An Action
  The spells page provides a block view of a defined action object.

  Example: Navigating to the Show Action Page
    Given the fixtures are loaded
    When I visit the "Actions index" page
    And I click the "Show" link for "Action" "Defenestrate"
    Then I should be on the "Show" page for the "Action"

  Rule: Viewing the Action
    Example: When The Action Does Not Exist
      When I visit the "Show" page for "Action" "Defenestrate"
      Then I should be on the "Actions index" page

    Example: When The Action Exists
      Given the fixtures are loaded
      When I visit the "Show" page for "Action" "Defenestrate"
      Then I should be on the "Show" page for the "Action"
      And  the "Action" block should display the data
