from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def before_all(context):
    options = Options()
    if "GOOGLE_CHROME_SHIM" in os.environ:
        options.binary_location = os.environ.get("GOOGLE_CHROME_SHIM", None)
        context.browser = webdriver.Chrome(chrome_options=options, executable_path="chromedriver")
    else:
        context.browser = webdriver.Chrome()

    context.port = 80
    if "PORT" in os.environ:
        context.port = os.environ.get("PORT")

    primary = context.browser.window_handles[0]
    context.browser.switch_to.window(primary)

def after_all(context):
    context.browser.close()
