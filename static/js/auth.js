// ===== AUTHENTICATION SYSTEM JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all authentication features
    initializePasswordStrength();
    initializeFormValidation();
    initializeAnimations();
    initializeLoadingStates();
    initializeTooltips();
});

// ===== PASSWORD STRENGTH INDICATOR =====
function initializePasswordStrength() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        if (input.name === 'password1' || input.name === 'password') {
            const strengthContainer = createPasswordStrengthIndicator();
            input.parentNode.appendChild(strengthContainer);
            
            input.addEventListener('input', function() {
                const strength = calculatePasswordStrength(this.value);
                updatePasswordStrengthIndicator(strengthContainer, strength);
            });
        }
    });
}

function createPasswordStrengthIndicator() {
    const container = document.createElement('div');
    container.className = 'password-strength';
    
    const bar = document.createElement('div');
    bar.className = 'password-strength-bar';
    
    const text = document.createElement('div');
    text.className = 'password-strength-text';
    text.style.cssText = 'font-size: 0.8rem; margin-top: 0.25rem; color: var(--text-muted);';
    
    container.appendChild(bar);
    container.appendChild(text);
    
    return container;
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Number');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Special character');
    
    if (password.length >= 12) score += 1;
    
    return { score, feedback, password };
}

function updatePasswordStrengthIndicator(container, strength) {
    const bar = container.querySelector('.password-strength-bar');
    const text = container.querySelector('.password-strength-text');
    
    // Remove existing classes
    bar.className = 'password-strength-bar';
    
    let strengthClass, strengthText, strengthColor;
    
    if (strength.password.length === 0) {
        strengthClass = '';
        strengthText = '';
        bar.style.width = '0%';
    } else if (strength.score <= 2) {
        strengthClass = 'strength-weak';
        strengthText = 'Weak';
        strengthColor = 'var(--error-color)';
    } else if (strength.score <= 3) {
        strengthClass = 'strength-fair';
        strengthText = 'Fair';
        strengthColor = 'var(--warning-color)';
    } else if (strength.score <= 4) {
        strengthClass = 'strength-good';
        strengthText = 'Good';
        strengthColor = 'var(--accent-color)';
    } else {
        strengthClass = 'strength-strong';
        strengthText = 'Strong';
        strengthColor = 'var(--success-color)';
    }
    
    bar.classList.add(strengthClass);
    text.textContent = strengthText;
    text.style.color = strengthColor;
    
    // Show feedback for weak passwords
    if (strength.score < 3 && strength.password.length > 0) {
        text.textContent += ` - Add: ${strength.feedback.slice(0, 2).join(', ')}`;
    }
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission validation
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showFormError('Please fix the errors below');
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Username validation
    if (fieldName === 'username' && value) {
        if (value.length < 3) {
            isValid = false;
            errorMessage = 'Username must be at least 3 characters long';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Username can only contain letters, numbers, and underscores';
        }
    }
    
    // Password confirmation validation
    if (fieldName === 'password2' && value) {
        const password1 = document.querySelector('input[name="password1"]');
        if (password1 && value !== password1.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = 'var(--error-color)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error-color);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: slideIn 0.3s ease-out;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFormError(message) {
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function getFieldLabel(fieldName) {
    const labels = {
        'username': 'Username',
        'email': 'Email',
        'password': 'Password',
        'password1': 'Password',
        'password2': 'Confirm Password'
    };
    return labels[fieldName] || fieldName;
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Stagger animation for form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== LOADING STATES =====
function initializeLoadingStates() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading-spinner"></span>Processing...';
            
            // Re-enable after 5 seconds (fallback)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 5000);
        });
    });
}

// ===== TOOLTIPS =====
function initializeTooltips() {
    // Add tooltips to form fields
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (input.name === 'username') {
            input.title = 'Choose a unique username (3+ characters, letters, numbers, underscores only)';
        } else if (input.name === 'email') {
            input.title = 'We\'ll send you a verification email';
        } else if (input.name === 'password1') {
            input.title = 'Use a strong password with at least 8 characters';
        } else if (input.name === 'password2') {
            input.title = 'Re-enter your password to confirm';
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: var(--shadow-lg);
    `;
    
    // Set background color based on type
    const colors = {
        'success': 'var(--success-color)',
        'error': 'var(--error-color)',
        'warning': 'var(--warning-color)',
        'info': 'var(--primary-color)'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== PASSWORD VISIBILITY TOGGLE =====
function togglePasswordVisibility(input) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    const toggle = input.parentNode.querySelector('.password-toggle');
    if (toggle) {
        toggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    }
}

// ===== FORM AUTO-SAVE (for better UX) =====
function initializeAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('input', debounce(function() {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                localStorage.setItem(`form_${form.id || 'default'}`, JSON.stringify(data));
            }, 1000));
        });
        
        // Restore saved data on page load
        const savedData = localStorage.getItem(`form_${form.id || 'default'}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input && !input.value) {
                        input.value = data[key];
                    }
                });
            } catch (e) {
                console.warn('Could not restore form data:', e);
            }
        }
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initializeAccessibility() {
    // Add ARIA labels to form elements
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = input.parentNode.querySelector('label');
            if (label) {
                input.setAttribute('aria-labelledby', label.id || label.textContent);
            }
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            const form = e.target.closest('form');
            if (form) {
                const inputs = Array.from(form.querySelectorAll('input'));
                const currentIndex = inputs.indexOf(e.target);
                const nextInput = inputs[currentIndex + 1];
                
                if (nextInput) {
                    e.preventDefault();
                    nextInput.focus();
                }
            }
        }
    });
}

// Initialize accessibility features
initializeAccessibility();
initializeAutoSave();

// ===== EXPORT FOR GLOBAL USE =====
window.AuthSystem = {
    showNotification,
    togglePasswordVisibility,
    validateField,
    validateForm
};
