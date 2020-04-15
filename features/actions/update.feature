Feature: Updating An Action
  The update action process allows the user to modify an existing action object.

  Rule: Navigating to the Update Action Page
    Example: From The Actions Index Page
      Given the fixtures are loaded
      When I visit the "Actions index" page
      And I click the "Update" link for "Action" "Defenestrate"
      Then I should be on the "Update" page for the "Action"

    Example: From The Show Action Page
      Given the fixtures are loaded
      When I visit the "Show" page for "Action" "Defenestrate"
      And  I click the "Update Action" link
      Then I should be on the "Update" page for the "Action"

  Rule: Updating the Action
    Example: When The Action Does Not Exist
      When I visit the "Update" page for "Action" "Defenestrate"
      Then I should be on the "Actions index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Action" "Defenestrate"
      And   I submit the "Action" form with invalid attributes
      Then  I should be on the "Update" page for the "Action"
      And   the "Action" form should display the data
      And   the "Action" form should display the errors

    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Action" "Defenestrate"
      And   I submit the "Action" form with valid attributes
      Then  I should be on the "Show" page for "Action" "Self-Destruct"
      And   the "Action" block should display the data
