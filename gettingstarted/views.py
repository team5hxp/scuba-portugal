from django.shortcuts import render


# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'index.html')


def login(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'login.html')


def welcome(request):
    return render(request, 'welcome.html')
