@items @reference @update
Feature: Updating An Item
  The update item process allows the user to modify an existing item object.

  Rule: Navigating to the Update Item Page
    Example: From The Items Index Page
      Given the fixtures are loaded
      When  I visit the "Items index" page
      And   I am logged in as a user
      And   I click the "Update" link for "Item" "Plush Flumph"
      Then  I should be on the "Update" page for the "Item"

    Example: From The Show Item Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Item" "Plush Flumph"
      And   I am logged in as a user
      And   I click the "Update Item" link
      Then  I should be on the "Update" page for the "Item"

  Rule: Updating the Item
    @authentication
    Example: As An Anonymous User
      When I visit the "Update" page for "Item" "Plush Flumph"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Item Does Not Exist
      When I visit the "Update" page for "Item" "Philosopher's Stone"
      And  I am logged in as a user
      Then I should be on the "Items index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Item" "Plush Flumph"
      And   I am logged in as a user
      And   I submit the "Item" form with invalid attributes
      Then  I should be on the "Update" page for the "Item"
      And   the "Item" form should display the data
      And   the "Item" form should display the errors

    @core
    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Item" "Plush Flumph"
      And   I am logged in as a user
      And   I submit the "Item" form with valid attributes
      Then  I should be on the "Show" page for "Item" "Big Red Button"
      And   the "Item" block should display the data
