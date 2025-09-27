# 🚀 Setup Guide - Authentication System

## 📋 Prerequisites
- Python 3.8+
- pip

## 🔧 Installation Steps

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Configuration
1. Copy the environment template:
   ```bash
   cp env_template.txt .env
   ```

2. Edit the `.env` file with your actual values:
   ```env
   # Django Settings
   SECRET_KEY=your-actual-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1

   # Email Configuration
   EMAIL_HOST_USER=your-actual-email@gmail.com
   EMAIL_HOST_PASSWORD=your-actual-app-password
   DEFAULT_FROM_EMAIL=your-actual-email@gmail.com
   ```

### 3. Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_HOST_PASSWORD`

### 4. Database Setup
```bash
python manage.py migrate
```

### 5. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 6. Run the Server
```bash
python manage.py runserver
```

## 🌐 Access the Application
- **Main URL:** http://127.0.0.1:8000/
- **Registration:** http://127.0.0.1:8000/register/
- **Login:** http://127.0.0.1:8000/login/
- **Admin Panel:** http://127.0.0.1:8000/admin/

## 🔒 Security Notes
- Never commit the `.env` file to version control
- Use strong, unique secret keys in production
- Set `DEBUG=False` in production
- Configure proper `ALLOWED_HOSTS` for production

## 📧 Email Testing
The system will send verification emails. Make sure:
- Your Gmail account has 2FA enabled
- You're using an App Password (not your regular password)
- Check spam folder if emails don't arrive

## 🐛 Troubleshooting
- **Email not sending:** Check your app password and 2FA settings
- **Database errors:** Run `python manage.py migrate`
- **Static files not loading:** Run `python manage.py collectstatic`
