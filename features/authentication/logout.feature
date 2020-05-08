Feature: Authentication
  The logout process allows an authenticated user to end their session.

  Example: Logging Out
    When I open the application
    And  I am logged in as a user
    And  I log out
    Then I should see the Login form
