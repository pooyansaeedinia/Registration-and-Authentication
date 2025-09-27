from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .models import CustomUser
from .forms import RegisterForm

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            domain = get_current_site(request).domain
            link = reverse('verify_email', kwargs={'uidb64': uid, 'token': token})
            verify_url = f'http://{domain}{link}'

            send_mail(
                subject='email verification',
                message=f'for verifying your email address click here\n{verify_url}',
                from_email='pooyan77777777@gmail.com',
                recipient_list=[user.email],
                fail_silently=False,
            )
            return redirect('check_your_email')
    else:
        form = RegisterForm()
    return render(request,'registration_app/register.html', {'form': form})


def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.is_email_verified = True
        user.save()
        return redirect('email_verified_success')
    else:
        return redirect('email_verification_failed')