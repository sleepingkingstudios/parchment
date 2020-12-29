@items @destroy @reference
Feature: Destroying An Item
  The destroy item process allows the user to delete an existing item object.

  Rule: Destroying an Item
    Example: From The Items Index Page
      Given the fixtures are loaded
      When  I visit the "Items index" page
      And   I am logged in as a user
      And   I click the "Delete" button for "Item" "Plush Flumph"
      And   I wait for 1 second
      Then  I should be on the "Items index" page
      And   the "Items" table should display the data
      And   the "Items" table should not display the data for the resource

    @core
    Example: From the Show Item Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Item" "Plush Flumph"
      And   I am logged in as a user
      And   I click the "Delete Item" button
      Then  I should be on the "Items index" page
      And   the "Items" table should display the data
      And   the "Items" table should not display the data for the resource
