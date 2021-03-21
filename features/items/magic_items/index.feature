@index @magic_items @reference
Feature: Showing Index
  The magic items index provides a tabular view of the defined magic item objects.

  Example: Navigating to the Magic Items Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Magic Items" link
    Then I should be on the "MagicItems index" page

  Rule: Viewing the Magic Items
    @authentication
    Example: As An Anonymous User
      When I visit the "MagicItems index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Items
      When I visit the "MagicItems index" page
      And  I am logged in as a user
      Then the "MagicItems" table should be empty

    @core
    Example: When There Are Many Magic Items
      Given the fixtures are loaded
      When  I visit the "MagicItems index" page
      And   I am logged in as a user
      Then  the "MagicItems" table should display the data
