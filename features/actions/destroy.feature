Feature: Destroying An Action
  The destroy action process allows the user to delete an existing action object.

  Rule: Destroying an Action
    Example: From The Actions Index Page
      Given the fixtures are loaded
      When  I visit the "Actions index" page
      And   I click the "Delete" button for "Action" "Defenestrate"
      And   I wait for 1 second
      Then  I should be on the "Actions index" page
      And   the "Actions" table should display the data
      And   the "Actions" table should not display the data for the resource

    Example: From the Show Action Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Action" "Defenestrate"
      And   I click the "Delete Action" button
      Then  I should be on the "Actions index" page
      And   the "Actions" table should display the data
      And   the "Actions" table should not display the data for the resource
