from behave import *
from selenium import webdriver

use_step_matcher("re")


browser = webdriver.Chrome()

@given("I open icebergideas website")
def step_impl(context):
    print(context)
    browser.get('http://www.icebergideas.com')
    browser.

@then("I print the title")
def step_impl(context):
    title = browser.title
    assert 'Iceberg' in title


