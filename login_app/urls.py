from django.contrib.auth.views import LogoutView
from django.shortcuts import render
from django.urls import path
from login_app.views import login_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
]

