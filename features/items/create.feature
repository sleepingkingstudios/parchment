@create @items @reference
Feature: Creating An Item
  The create item process allows the user to define an item.

  Example: Navigating to the Create Item Page
    When I visit the "Items index" page
    And  I am logged in as a user
    And  I click the "Create Item" link
    Then I should be on the "Items create" page

  Rule: Creating an Item
    @authentication
    Example: As An Anonymous User
      When I visit the "Items create" page
      And  I am not logged in
      Then I should see the Login form

    Example: With Invalid Attributes
      When I visit the "Items create" page
      And  I am logged in as a user
      And  I submit the "Item" form with invalid attributes
      Then I should be on the "Items create" page
      And  the "Item" form should display the data
      And  the "Item" form should display the errors

    @core
    Example: With Valid Attributes
      When I visit the "Items create" page
      And  I am logged in as a user
      And  I submit the "Item" form with valid attributes
      Then I should be on the "Show" page for "Item" "Big Red Button"
      And  the "Item" block should display the data
