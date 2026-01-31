import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../../context/SignUpContext';
import SignUpForm from './SignUpForm';
import uaFlag from '../../../assets/flag-ukraine.svg';

const SignUpStep2 = () => {
  const { data, setEmail, setPhone, backendErrors, clearBackendError } =
    useSignUp();

  const { email, phone_number: phone } = data;

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPhoneValid = phone.replace(/\D/g, '').length === 9;

  const isFilled = Boolean(email && phone);

  const handleContinue = () => {
    const emailOk = isEmailValid;
    const phoneOk = isPhoneValid;

    setEmailError(!emailOk);
    setPhoneError(!phoneOk);

    if (!emailOk || !phoneOk) return;

    navigate('/signup/step-3');
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 9);

    const parts = [
      digits.slice(0, 2),
      digits.slice(2, 5),
      digits.slice(5, 7),
      digits.slice(7, 9),
    ].filter(Boolean);

    return parts.join('-');
  };

  return (
    <SignUpForm step={2} isValid={isFilled} onContinue={handleContinue}>
      {/* Email */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Email</span>

          {(emailError || backendErrors.email) && (
            <span className='auth-form__error'>
              {backendErrors.email?.[0] || 'Invalid email'}
            </span>
          )}
        </span>

        <input
          className={`auth-form__input ${
            emailError || backendErrors.email ? 'auth-form__input--error' : ''
          }`}
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            clearBackendError('email');
          }}
        />
      </label>

      {/* Phone */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Phone number</span>

          {(phoneError || backendErrors.phone_number) && (
            <span className='auth-form__error'>
              {backendErrors.phone_number?.[0] || 'Enter full phone number'}
            </span>
          )}
        </span>

        <div className='auth-form__phone'>
          <div className='auth-form__country'>
            <img src={uaFlag} alt='UA' />
            <span>+380</span>
          </div>

          <input
            className={`auth-form__phone-input ${
              phoneError || backendErrors.phone_number
                ? 'auth-form__input--error'
                : ''
            }`}
            type='tel'
            placeholder='12-345-67-89'
            maxLength={12}
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              setPhoneError(false);
              clearBackendError('phone_number');
            }}
          />
        </div>

        <span className='auth-form__hint'>
          Used only for volunteering coordination
        </span>
      </label>
    </SignUpForm>
  );
};

export default SignUpStep2;
