@index @items @reference
Feature: Showing Items
  The items index provides a tabular view of the defined item objects.

  Example: Navigating to the Items Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Items" link
    Then I should be on the "Items index" page

  Rule: Viewing the Items
    @authentication
    Example: As An Anonymous User
      When I visit the "Items index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Items
      When I visit the "Items index" page
      And  I am logged in as a user
      Then the "Items" table should be empty

    @core
    Example: When There Are Many Items
      Given the fixtures are loaded
      When  I visit the "Items index" page
      And   I am logged in as a user
      Then  the "Items" table should display the data
