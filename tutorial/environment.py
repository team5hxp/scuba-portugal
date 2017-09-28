from selenium import webdriver


def before_all(context):
    context.browser = webdriver.Chrome()
    primary = context.browser.window_handles[0]
    context.browser.switch_to.window(primary)


def after_all(context):
    context.browser.close()
