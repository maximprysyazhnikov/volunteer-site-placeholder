import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import uaFlag from '../../../assets/flag-ukraine.svg';
import {
  isEmailValid,
  isPhoneValid,
  formatPhone,
} from '../../../utils/validators';

const SignUpStep2 = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const navigate = useNavigate();

  const isFilled = Boolean(email && phone);

  const handleContinue = () => {
    const emailOk = isEmailValid(email);
    const phoneOk = isPhoneValid(phone);

    setEmailError(!emailOk);
    setPhoneError(!phoneOk);

    if (!emailOk || !phoneOk) return;

    navigate('/signup/step-3');
  };

  return (
    <SignUpForm step={2} isValid={isFilled} onContinue={handleContinue}>
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Email</span>
          {emailError && (
            <span className='auth-form__error'>Invalid email</span>
          )}
        </span>

        <input
          className={`auth-form__input ${emailError ? 'auth-form__input--error' : ''}`}
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
        />
      </label>
      
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Phone number</span>
          {phoneError && (
            <span className='auth-form__error'>Enter full phone number</span>
          )}
        </span>

        <div className='auth-form__phone'>
          <div className='auth-form__country'>
            <img src={uaFlag} alt='UA' />
            <span>+380</span>
          </div>

          <input
            className={`auth-form__phone-input ${phoneError ? 'auth-form__input--error' : ''}`}
            type='tel'
            placeholder='12-345-67-89'
            maxLength={12}
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              setPhoneError(false);
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
