# Date: 2019-04-10 上午 10:54
from django.shortcuts import render
def index1(request):
    return render(request, 'index.html')
