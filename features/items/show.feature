@items @reference @show
Feature: Showing An Item
  The items page provides a block view of a defined item object.

  Example: Navigating to the Show Item Page
    Given the fixtures are loaded
    When  I visit the "Items index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Item" "Plush Flumph"
    Then  I should be on the "Show" page for the "Item"

  Rule: Viewing the Item
    @authentication
    Example: As An Anonymous User
      When I visit the "Show" page for "Item" "Plush Flumph"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Item Does Not Exist
      When I visit the "Show" page for "Item" "Plush Flumph"
      And  I am logged in as a user
      Then I should be on the "Items index" page

    @core
    Example: When The Item Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Item" "Plush Flumph"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Item"
      And   the "Item" block should display the data
