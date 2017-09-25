from behave import *
from selenium import webdriver

# use_step_matcher("re")

driver = webdriver.Chrome()
# focus window on top
window_before = driver.window_handles[0]
driver.switch_to.window(window_before)

@given("I open icebergideas website")
def step_impl(context):
    print(context)
    driver.get('http://localhost:8080/login.html')
    continue_link = driver.find_element_by_link_text('Speaking')
    continue_link.click()


@then("I print the title")
def step_impl(context):
    title = driver.title
    assert 'Iceberg' in title
