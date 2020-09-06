@conditions @mechanics @reference @update
Feature: Updating An Condition
  The update condition process allows the user to modify an existing condition object.

  Rule: Navigating to the Update Condition Page
    Example: From The Conditions Index Page
      Given the fixtures are loaded
      When  I visit the "Conditions index" page
      And   I am logged in as a user
      And   I click the "Update" link for "Condition" "Zombie"
      Then  I should be on the "Update" page for the "Condition"

    Example: From The Show Condition Page
      Given the fixtures are loaded
      When  I visit the "Show" page for "Condition" "Zombie"
      And   I am logged in as a user
      And   I click the "Update Condition" link
      Then  I should be on the "Update" page for the "Condition"

  Rule: Updating the Condition
    @authentication
    Example: As An Anonymous User
      When I visit the "Update" page for "Condition" "Zombie"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Condition Does Not Exist
      When I visit the "Update" page for "Condition" "Enervated"
      And  I am logged in as a user
      Then I should be on the "Conditions index" page

    Example: With Invalid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Condition" "Zombie"
      And   I am logged in as a user
      And   I submit the "Condition" form with invalid attributes
      Then  I should be on the "Update" page for the "Condition"
      And   the "Condition" form should display the data
      And   the "Condition" form should display the errors

    @core
    Example: With Valid Attributes
      Given the fixtures are loaded
      When  I visit the "Update" page for "Condition" "Zombie"
      And   I am logged in as a user
      And   I submit the "Condition" form with valid attributes
      Then  I should be on the "Show" page for "Condition" "Lethargy"
      And   the "Condition" block should display the data
