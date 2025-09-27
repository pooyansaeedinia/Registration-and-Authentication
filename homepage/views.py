from django.shortcuts import render

def home_view(request):
    """
    Homepage view that displays project features and navigation links
    """
    context = {
        'features': [
            {
                'icon': 'fas fa-user-plus',
                'title': 'User Registration',
                'description': 'Secure user registration with email verification system'
            },
            {
                'icon': 'fas fa-sign-in-alt',
                'title': 'Secure Login',
                'description': 'Modern authentication with remember me functionality'
            },
            {
                'icon': 'fas fa-key',
                'title': 'Password Reset',
                'description': 'Complete password reset flow with email confirmation'
            },
            {
                'icon': 'fas fa-shield-alt',
                'title': 'Email Verification',
                'description': 'Email verification system for account security'
            },
            {
                'icon': 'fas fa-mobile-alt',
                'title': 'Responsive Design',
                'description': 'Beautiful UI that works on all devices'
            },
            {
                'icon': 'fas fa-palette',
                'title': 'Modern UI/UX',
                'description': 'Glassmorphism design with smooth animations'
            }
        ]
    }
    return render(request, 'homepage/home.html', context)