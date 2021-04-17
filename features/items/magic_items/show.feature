@magic_items @reference @show
Feature: Showing A Magic Item
  The magic items page provides a block view of a defined magic item object.

  Example: Navigating to the Show Magic Item Page
    Given the fixtures are loaded
    When  I visit the "Items::MagicItems index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Items::MagicItem" "Chimes of Crime"
    Then  I should be on the "Show" page for the "Items::MagicItem"

  Rule: Viewing the Magic Item
    @authentication
    Example: As An Anonymous User
      When I visit the "Show" page for "Items::MagicItem" "Chimes of Crime"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Magic Item Does Not Exist
      When I visit the "Show" page for "Items::MagicItem" "Severed Head of Vecna"
      And  I am logged in as a user
      Then I should be on the "Items::MagicItems index" page

    @core
    Example: When The Magic Item Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Items::MagicItem" "Chimes of Crime"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Items::MagicItem"
      And   the "Items::MagicItem" block should display the data
