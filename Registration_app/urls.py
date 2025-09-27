
from django.urls import path
from .views import register_view, verify_email, render

urlpatterns = [
    path('register/', register_view, name='register'),
    path('verify/<uidb64>/<token>/', verify_email, name='verify_email'),
    path('check-email/', lambda r: render(r, 'registration_app/check_your_email.html'), name='check_your_email'),
    path('email-verified/', lambda r: render(r, 'registration_app/email_verified_success.html'), name='email_verified_success'),
    path('email-failed/', lambda r: render(r, 'registration_app/email_verification_failed.html'), name='email_verification_failed'),

]