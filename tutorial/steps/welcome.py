import time

from behave import given, when, then, use_step_matcher, step

use_step_matcher("re")

pause = 1


@given("I am on the welcome page")
def step_impl(context):
    context.browser.get('http://localhost:' + str(context.port) + '/welcome')
    time.sleep(pause)


@when("I click on Book Recommendation")
def step_impl(context):
    context.browser.find_element_by_id('bookRecomendations').click()


@then("I should see the a Popup page with recommended book")
def step_impl(context):
    assert context.browser.title == "Scuba Portugal - Welcome"


