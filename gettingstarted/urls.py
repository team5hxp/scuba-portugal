from django.conf.urls import include, url

from django.contrib import admin

admin.autodiscover()

import gettingstarted.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^welcome', gettingstarted.views.welcome, name='welcome'),
    url(r'^logout', gettingstarted.views.logout, name='logout'),
    url(r'^login', gettingstarted.views.login, name='login'),
    url(r'^$', gettingstarted.views.index, name='index'),
    url(r'^admin/', include(admin.site.urls)),
]
