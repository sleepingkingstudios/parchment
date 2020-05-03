Feature: Showing Spells
  The spells index provides a tabular view of the defined spell objects.

  Example: Navigating to the Spells Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Spells" link
    Then I should be on the "Spells index" page

  Rule: Viewing the Spells
    Example: As An Anonymous User
      When I visit the "Spells index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Spells
      When  I visit the "Spells index" page
      And   I am logged in as a user
      Then  the "Spells" table should be empty

    Example: When There Are Many Spells
      Given the fixtures are loaded
      When  I visit the "Spells index" page
      And   I am logged in as a user
      Then  the "Spells" table should display the data
