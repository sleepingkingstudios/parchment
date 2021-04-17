@create @items @reference
Feature: Creating A Magic Item
  The create magic item process allows the user to define a magic item.

  Example: Navigating to the Create Magic Item Page
    When I visit the "Items::MagicItems index" page
    And  I am logged in as a user
    And  I click the "Create Magic Item" link
    Then I should be on the "Items::MagicItems create" page

  Rule: Creating an Item
    @authentication
    Example: As An Anonymous User
      When I visit the "Items::MagicItems create" page
      And  I am not logged in
      Then I should see the Login form

    Example: With Invalid Attributes
      When I visit the "Items::MagicItems create" page
      And  I am logged in as a user
      And  I submit the "Items::MagicItems" form with invalid attributes
      Then I should be on the "Items::MagicItems create" page
      And  the "Items::MagicItems" form should display the data
      And  the "Items::MagicItems" form should display the errors

    @core
    Example: With Valid Attributes
      When I visit the "Items::MagicItems create" page
      And  I am logged in as a user
      And  I submit the "Items::MagicItems" form with valid attributes
      Then I should be on the "Show" page for "Items::MagicItems" "Philter of Filtering"
      And  the "Items::MagicItems" block should display the data
