import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import uaFlag from '../../../assets/flag-ukraine.svg';
import { isEmailValid } from '../../../utils/validators';

type Props = {
  admin: boolean;
}

const SignUpStep2 = ({admin}: Props) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const isEmailValidValue = isEmailValid(email);
  const isPhoneValid = phone.replace(/\D/g, '').length === 9;

  const isFilled = Boolean(email && phone);

  const handleContinue = (path: string) => {
    if (!isEmailValidValue) {
      setEmailError(true);
      return;
    }

    if (!isPhoneValid) {
      return;
    }
    navigate(path);
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
    <>
      {admin === true ? (
        <SignUpForm 
          step={2} 
          isValid={isFilled} 
          onContinue={() => handleContinue('/administrationsignup/step-3')}
          path='administrationsignup'
          >
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

        <label className='auth-form__label'>
          <span className='auth-form__label-text'>Phone number</span>
          <div className='auth-form__phone'>
            <div className='auth-form__country'>
              <img src={uaFlag} alt='UA' />
              <span>+380</span>
            </div>

            <input
              className='auth-form__phone-input'
              type='tel'
              placeholder='12-345-67-89'
              maxLength={12}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />
          </div>
          <span className='auth-form__hint'>
            Used only for volunteering coordination
          </span>
        </label>
      </SignUpForm> 
      ) : (
        <SignUpForm step={2} isValid={isFilled} onContinue={() => handleContinue('/signup/step-3')}>
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

        <label className='auth-form__label'>
          <span className='auth-form__label-text'>Phone number</span>
          <div className='auth-form__phone'>
            <div className='auth-form__country'>
              <img src={uaFlag} alt='UA' />
              <span>+380</span>
            </div>

            <input
              className='auth-form__phone-input'
              type='tel'
              placeholder='12-345-67-89'
              maxLength={12}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />
          </div>
          <span className='auth-form__hint'>
            Used only for volunteering coordination
          </span>
        </label>
      </SignUpForm>
      )}
    </>
  );
};

export default SignUpStep2;
