document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const interestGroup = document.getElementById('interestGroup');
    const interestTagsContainer = document.getElementById('interestTags');
    const terms = document.getElementById('terms');

    const errorElements = document.querySelectorAll('.error-message');

    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    const successMessage = document.getElementById('successMessage');

    const FORM_DATA_KEY = 'signupFormData';
-
    function showError(field, message) {
        const errorId = field.getAttribute('aria-describedby');
        const errorEl = document.getElementById(errorId.split(' ')[0]); // 取第一個 ID
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
        field.classList.add('invalid');
        field.classList.remove('valid');
    }

    function clearError(field) {
        const errorId = field.getAttribute('aria-describedby');
        const errorEl = document.getElementById(errorId.split(' ')[0]);
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
        field.classList.remove('invalid');
        if (field.classList.contains('validated')) {
            field.classList.add('valid');
        }
    }

    function validateField(field) {
        let message = '';
        field.setCustomValidity('');

        if (field.validity.valueMissing) {
            message = '此欄位為必填';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                message = '請輸入有效的 Email 格式';
            }
        } else if (field.validity.patternMismatch) {
            if (field.type === 'tel') {
                message = '請輸入 10 碼數字';
            }
        } else if (field.validity.tooShort) {
            message = `密碼長度至少需 ${field.minLength} 碼`;
        }

        switch (field.id) {
            case 'phone':
                if (field.value && !/^\d{10}$/.test(field.value)) {
                    message = '手機號碼必須剛好是 10 碼數字';
                }
                break;
            case 'password':
                if (field.value && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(field.value)) {
                    message = '密碼需為 8 碼以上的英數混合';
                }
                updatePasswordStrength(field.value); 
                break;
            case 'confirmPassword':
                if (field.value && field.value !== password.value) {
                    message = '確認密碼與密碼不一致';
                }
                break;
        }

        if (message) {
            field.setCustomValidity(message); 
            showError(field, message);
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    
    function validateInterestGroup() {
        const checkedInterests = interestTagsContainer.querySelectorAll('input[type="checkbox"]:checked');
        const message = '請至少選擇 1 個興趣標籤';
        
        if (checkedInterests.length === 0) {
            interestGroup.setCustomValidity(message); 
            showError(interestGroup, message);
            return false;
        } else {
            interestGroup.setCustomValidity('');
            clearError(interestGroup);
            return true;
        }
    }

    
    function validateTerms() {
        if (!terms.checked) {
            const message = '您必須同意服務條款';
            terms.setCustomValidity(message);
            showError(terms, message);
            return false;
        } else {
            terms.setCustomValidity('');
            clearError(terms);
            return true;
        }
    }


    const fieldsToValidate = [username, email, phone, password, confirmPassword];

    fieldsToValidate.forEach(field => {
        
        field.addEventListener('blur', () => {
            field.classList.add('validated');
            validateField(field);
        });

        
        field.addEventListener('input', () => {
            if (field.classList.contains('validated')) {
                validateField(field);
            }
            if (field.id === 'password' && confirmPassword.classList.contains('validated')) {
                validateField(confirmPassword);
            }
        });
    });

    terms.addEventListener('change', () => {
        terms.classList.add('validated');
        validateTerms();
    });

    interestTagsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const label = e.target.nextElementSibling;
            if (label && label.classList.contains('tag-label')) {
                label.classList.toggle('selected', e.target.checked);
            }
            
            interestGroup.classList.add('validated');
            validateInterestGroup();
        }
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const allFields = [username, email, phone, password, confirmPassword, terms];
        
        allFields.forEach(field => field.classList.add('validated'));
        interestGroup.classList.add('validated');
        
        const isUsernameValid = validateField(username);
        const isEmailValid = validateField(email);
        const isPhoneValid = validateField(phone);
        const isPasswordValid = validateField(password);
        const isConfirmPasswordValid = validateField(confirmPassword);
        const isInterestsValid = validateInterestGroup();
        const isTermsValid = validateTerms();

        const isFormValid = isUsernameValid && isEmailValid && isPhoneValid && 
                            isPasswordValid && isConfirmPasswordValid && 
                            isInterestsValid && isTermsValid;

        if (isFormValid) {
            handleFormSuccess();
        } else {
            const firstInvalidField = form.querySelector('.invalid');
            if (firstInvalidField) {
                if (firstInvalidField.id === 'interestGroup') {
                    firstInvalidField.querySelector('input[type="checkbox"]').focus();
                } else {
                    firstInvalidField.focus();
                }
            }
        }
    });

    
    function handleFormSuccess() {
        console.log('表單驗證成功，模擬送出...');
        
        
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').hidden = true;
        submitBtn.querySelector('.btn-loader').hidden = false;

        setTimeout(() => {
            form.hidden = true;
            successMessage.hidden = false;
            window.scrollTo(0, 0); 

            localStorage.removeItem(FORM_DATA_KEY);

        }, 1000);
    }

    
    function updatePasswordStrength(pass) {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/\d/.test(pass)) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        strengthBar.className = 'strength-bar'; 

        if (pass.length === 0) {
            strengthText.textContent = '';
        } else if (score <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = '弱';
        } else if (score <= 4) {
            strengthBar.classList.add('medium');
            strengthText.textContent = '中';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = '強';
        }
    }

    function saveFormData() {
        const formData = {
            username: username.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            interests: Array.from(interestTagsContainer.querySelectorAll('input:checked')).map(cb => cb.value),
            terms: terms.checked,
        };
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY));
        if (!savedData) return;

        username.value = savedData.username || '';
        email.value = savedData.email || '';
        phone.value = savedData.phone || '';
        password.value = savedData.password || '';
       
        if (savedData.interests && savedData.interests.length > 0) {
            savedData.interests.forEach(value => {
                const cb = interestTagsContainer.querySelector(`input[value="${value}"]`);
                if (cb) {
                    cb.checked = true;
                    
                    const label = cb.nextElementSibling;
                    if (label) label.classList.add('selected');
                }
            });
        }

        
        terms.checked = savedData.terms || false;

        if (password.value) {
            updatePasswordStrength(password.value);
        }
    }

    form.addEventListener('input', saveFormData);
    loadFormData();

    function resetFormState() {
        form.reset(); 

        errorElements.forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });
        
        form.querySelectorAll('.validated').forEach(el => el.classList.remove('validated'));
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        form.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));

        interestTagsContainer.querySelectorAll('.tag-label').forEach(label => {
            label.classList.remove('selected');
        });

        strengthBar.className = 'strength-bar';
        strengthText.textContent = '';

        localStorage.removeItem(FORM_DATA_KEY);

        username.focus();
    }

    resetBtn.addEventListener('click', resetFormState);

});