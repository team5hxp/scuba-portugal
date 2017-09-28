import time

from behave import given, when, then, use_step_matcher, step

use_step_matcher("re")
pause = 1


@given("I am on the login page")
def step_impl(context):
    context.browser.get('http://localhost:5000/login.html')
    time.sleep(pause)


@when("I enter a valid username and password")
def step_impl(context):
    username = context.browser.find_element_by_id('username')
    username.send_keys("user")
    time.sleep(pause)
    password = context.browser.find_element_by_id('password')
    password.send_keys("pass")
    time.sleep(pause)
    context.browser.find_element_by_id('submit').click()


@then("I should see the welcome page")
def step_impl(context):
    assert context.browser.title == "Scuba Portugal - Welcome"


@when("I enter an invalid username or password")
def step_impl(context):
    username = context.browser.find_element_by_id('username')
    username.send_keys("wronguser")
    time.sleep(pause)
    password = context.browser.find_element_by_id('password')
    password.send_keys("wrongpass")
    time.sleep(pause)
    context.browser.find_element_by_id('submit').click()


@then("I expect to be on the login page")
def step_impl(context):
    assert context.browser.title == "Scuba Portugal - Login"


@step("I expect to see an error message")
def step_impl(context):
    message = context.browser.find_element_by_id('message').text
    assert message == "Incorrect Username/Password. Please try again."


@when("I am missing a username")
def step_impl(context):
    username = context.browser.find_element_by_id('username')
    username.send_keys("")
    time.sleep(pause)
    password = context.browser.find_element_by_id('password')
    password.send_keys("wrongpass")
    time.sleep(pause)
    context.browser.find_element_by_id('submit').click()


@step("I expect to see an missing field error")
def step_impl(context):
    message = context.browser.find_element_by_id('message').text
    assert message == "Missing Username"

