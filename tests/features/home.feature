Feature: Confirm proper title
  Each group must have the proper title on their page
  Not really a behavioural test but a simple example

  Scenario: Home page loads
    Given I am on the home page
    When the page is loaded
    Then I expect to see the proper group name in the title

