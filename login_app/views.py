import time

from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import LoginForm

# Create your views here.

def login_view(request):
    form = LoginForm(request.POST or None)
    error_message = None

    if request.method == "POST":
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data['password']

            user = authenticate(request, username=username, password=password)

            if user:
                if user.is_active:
                    login(request, user)
                    messages.success(request, "You are now logged in")
                    return redirect('dashboard')
                else:
                    error_message = "your email is not verified"
            else:
                error_message = "your username or password is not correct"

    return render(request, 'login_app/login.html', {'form': form, 'error_message': error_message})
