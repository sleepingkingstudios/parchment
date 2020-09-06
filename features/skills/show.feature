@reference @skills @show
Feature: Showing A Skill
  The skill page provides a block view of a defined skill object.

  Example: Navigating to the Show Skill Page
    Given the fixtures are loaded
    When  I visit the "Skills index" page
    And   I am logged in as a user
    And   I click the "Show" link for "Skill" "Unspeakable Knowledge"
    Then  I should be on the "Show" page for the "Skill"

  Rule: Viewing the Skill
    @authentication
    Example: As An Anonymous User
      When I visit the "Show" page for "Skill" "Unspeakable Knowledge"
      And  I am not logged in
      Then I should see the Login form

    Example: When The Skill Does Not Exist
      When I visit the "Show" page for "Skill" "Unspeakable Knowledge"
      And  I am logged in as a user
      Then I should be on the "Skills index" page

    @core
    Example: When The Skill Exists
      Given the fixtures are loaded
      When  I visit the "Show" page for "Skill" "Unspeakable Knowledge"
      And   I am logged in as a user
      Then  I should be on the "Show" page for the "Skill"
      And   the "Skill" block should display the data
