@authentication @core
Feature: Authentication
  The login process allows the system to authenticate the user.

  Example: Accessing The Login Form
    When  I open the application
    And   I am not logged in
    Then  I should see the Login form

  Rule: Logging In
    Example: With An Invalid Username And Password
      When I open the application
      And  I am not logged in
      And  I submit the Login form with invalid attributes
      Then I should see the Login form

    Example: With A Valid Email Address And Password
      When I open the application
      And  I am not logged in
      And  I submit the Login form with a valid email address
      Then I should not see the Login form

    Example: With A Valid Username And Password
      When I open the application
      And  I am not logged in
      And  I submit the Login form with a valid email address
      Then I should not see the Login form
