@languages @reference @show
Feature: Showing A Language
  The language page provides a block view of a defined language object.

  Example: Navigating to the Show Language Page
    Given the fixtures are loaded
    When  I visit the "Languages index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Language" "Flumph"
    Then  I should be on the "Show" page for the "Language"

  Rule: Viewing the Language
    @authentication
    Example: As An Anonymous User
      When I visit the "Show" page for "Language" "Flumph"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Language Does Not Exist
      When I visit the "Show" page for "Language" "Nonsensical Babble"
      And  I am logged in as a user
      Then I should be on the "Languages index" page

    @core
    Example: When The Language Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Language" "Flumph"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Language"
      And   the "Language" block should display the data
      And   the "Language" block should display the empty "Dialects" table

    Example: When The Language Has A Parent Language
      Given the fixtures are loaded
      When  I visit the "Show" page for "Language" "Elder Sign"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Language"
      And   the "Language" block should display the data
      And   the "Language" block should display the "Parent Language" link
      And   the "Language" block should display the empty "Dialects" table

    Example: When The Language Has Dialects
      Given the fixtures are loaded
      When  I visit the "Show" page for "Language" "Tentacle Sign"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Language"
      And   the "Language" block should display the data
      And   the "Language" block should display the "Dialects" table
