@index @reference @skills
Feature: Showing Skills
  The skills index provides a tabular view of the defined skill objects.

  Example: Navigating to the Skills Index Page
    When I open the application
    And  I am logged in as a user
    And  I click the "Skills" link
    Then I should be on the "Skills index" page

  Rule: Viewing the Skills
    @authentication
    Example: As An Anonymous User
      When I visit the "Skills index" page
      And  I am not logged in
      Then I should see the Login form

    Example: When There Are No Skills
      When I visit the "Skills index" page
      And  I am logged in as a user
      Then the "Skills" table should be empty

    @core
    Example: When There Are Many Skills
      Given the fixtures are loaded
      When  I visit the "Skills index" page
      And   I am logged in as a user
      Then  the "Skills" table should display the data
