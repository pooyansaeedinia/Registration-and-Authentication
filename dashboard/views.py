from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.forms import UserChangeForm

@login_required
def dashboard_view(request):
    """
    Dashboard view that shows user information and profile management options
    """
    user = request.user
    context = {
        'user': user,
        'user_stats': {
            'member_since': user.date_joined.strftime('%B %Y'),
            'last_login': user.last_login.strftime('%B %d, %Y at %I:%M %p') if user.last_login else 'Never',
            'email_verified': user.is_email_verified,
        }
    }
    return render(request, 'dashboard/dashboard.html', context)

@login_required
def profile_view(request):
    """
    Profile view for editing user information
    """
    if request.method == 'POST':
        form = UserChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated successfully!')
            return redirect('dashboard')
    else:
        form = UserChangeForm(instance=request.user)
    
    context = {
        'form': form,
        'user': request.user
    }
    return render(request, 'dashboard/profile.html', context)
