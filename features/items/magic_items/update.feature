@magic_items @reference @update
Feature: Updating A Magic Item
  The update magic item process allows the user to modify an existing magic item object.

  Rule: Navigating to the Update Magic Item Page
    Example: From The Magic Items Index Page
      Given the fixtures are loaded
      When  I visit the "Items::MagicItems index" page
      And   I am logged in as a user
      And   I click the "Update" link for "Items::MagicItems" "Chimes of Crime"
      Then  I should be on the "Update" page for the "Items::MagicItem"

    Example: From The Show Magic Item Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Items::MagicItems" "Chimes of Crime"
      And   I am logged in as a user
      And   I click the "Update Magic Item" link
      Then  I should be on the "Update" page for the "Items::MagicItems"

  Rule: Updating the Magic Item
    @authentication
    Example: As An Anonymous User
      When I visit the "Update" page for "Items::MagicItems" "Chimes of Crime"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Magic Item Does Not Exist
      When I visit the "Update" page for "Items::MagicItems" "Collect Call of Cthulhu"
      And  I am logged in as a user
      Then I should be on the "Items::MagicItems index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Items::MagicItems" "Chimes of Crime"
      And   I am logged in as a user
      And   I submit the "Items::MagicItems" form with invalid attributes
      Then  I should be on the "Update" page for the "Items::MagicItems"
      And   the "Items::MagicItems" form should display the data
      And   the "Items::MagicItems" form should display the errors

    @core
    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Items::MagicItems" "Chimes of Crime"
      And   I am logged in as a user
      And   I submit the "Items::MagicItems" form with valid attributes
      Then  I should be on the "Show" page for "Items::MagicItems" "Philter of Filtering"
      And   the "Items::MagicItems" block should display the data
