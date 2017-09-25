import time
from behave import *
from selenium import webdriver

use_step_matcher("re")

driver = webdriver.Chrome()
# focus window on top
primary = driver.window_handles[0]
driver.switch_to.window(primary)

pause = 1

def before_all(context):
    pass

@given("I am on the login page")
def step_impl(context):
    driver.get('http://localhost:8000/login.html')
    time.sleep(pause)


@when("I enter a valid username and password")
def step_impl(context):
    driver.switch_to.window(primary)
    username = driver.find_element_by_id('username')
    username.send_keys("user")
    time.sleep(pause)
    password = driver.find_element_by_id('password')
    password.send_keys("pass")
    time.sleep(pause)
    driver.find_element_by_id('submit').click()

@then("I should see the welcome page")
def step_impl(context):
    assert driver.title == "ATDD test - Welcome Page"


def after_all(context):
    driver.close()
#
# @when("I enter an invalid username or password")
# def step_impl(context):
#     """
#     :type context: behave.runner.Context
#     """
#     pass
#
#
# @then("I expect to be on the login page")
# def step_impl(context):
#     """
#     :type context: behave.runner.Context
#     """
#     pass
#
#
# @step("I expect to see an error message")
# def step_impl(context):
#     """
#     :type context: behave.runner.Context
#     """
#     pass
#
#
# @when("I am missing a username")
# def step_impl(context):
#     """
#     :type context: behave.runner.Context
#     """
#     pass
#
#
# @step("I expect to see an missing field error")
# def step_impl(context):
#     """
#     :type context: behave.runner.Context
#     """
#     pass