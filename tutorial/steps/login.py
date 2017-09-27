import time

from behave import *
from selenium import webdriver

use_step_matcher("re")

driver = webdriver.Chrome()
# focus window on top
primary = driver.window_handles[0]

pause = 1


def before_scenario(context):
    driver.switch_to.window(primary)


@given("I am on the login page")
def step_impl(context):
    driver.switch_to.window(primary)
    driver.get('http://localhost:5000/login')
    time.sleep(pause)


@when("I enter a valid username and password")
def step_impl(context):
    username = driver.find_element_by_id('username')
    username.send_keys("user")
    time.sleep(pause)
    password = driver.find_element_by_id('password')
    password.send_keys("pass")
    time.sleep(pause)
    driver.find_element_by_id('submit').click()


@then("I should see the welcome page")
def step_impl(context):
    assert driver.title == "Scuba Portugal - Welcome"


@when("I enter an invalid username or password")
def step_impl(context):
    username = driver.find_element_by_id('username')
    username.send_keys("wronguser")
    time.sleep(pause)
    password = driver.find_element_by_id('password')
    password.send_keys("wrongpass")
    time.sleep(pause)
    driver.find_element_by_id('submit').click()


@then("I expect to be on the login page")
def step_impl(context):
    assert driver.title == "Scuba Portugal - Login"


@step("I expect to see an error message")
def step_impl(context):
    message = driver.find_element_by_id('message').text
    assert message == "Incorrect Username/Password. Please try again."


@when("I am missing a username")
def step_impl(context):
    username = driver.find_element_by_id('username')
    username.send_keys("")
    time.sleep(pause)
    password = driver.find_element_by_id('password')
    password.send_keys("wrongpass")
    time.sleep(pause)
    driver.find_element_by_id('submit').click()


@step("I expect to see an missing field error")
def step_impl(context):
    message = driver.find_element_by_id('message').text
    assert message == "Missing Username"



def after_scenario(context):
    driver.close()
