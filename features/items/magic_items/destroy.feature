@destroy @magic_items @reference
Feature: Destroying A Magic Item
  The destroy magic item process allows the user to delete an existing magic item object.

  Rule: Destroying a Magic Item
    Example: From The Magic Items Index Page
      Given the fixtures are loaded
      When  I visit the "Items::MagicItems index" page
      And   I am logged in as a user
      And   I click the "Delete" button for "Items::MagicItems" "Chimes of Crime"
      And   I wait for 1 second
      Then  I should be on the "Items::MagicItems index" page
      And   the "Items::MagicItems" table should display the data
      And   the "Items::MagicItems" table should not display the data for the resource

    @core
    Example: From the Show Magic Item Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Items::MagicItems" "Chimes of Crime"
      And   I am logged in as a user
      And   I click the "Delete Magic Item" button
      Then  I should be on the "Items::MagicItems index" page
      And   the "Items::MagicItems" table should display the data
      And   the "Items::MagicItems" table should not display the data for the resource
