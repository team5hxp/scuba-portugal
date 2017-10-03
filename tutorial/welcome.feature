Feature: Welcome

  As a user
  I want to check book recommendations
  

  Scenario: Click Book Recommendation
    Given I am on the welcome page
    When I click on Book Recommendation
    Then I should see the a Popup page with recommended book

