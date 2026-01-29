import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';

type Props = {
  admin: boolean;
}

const SignUpStep1 = ({admin}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const isValid: boolean = Boolean(firstName.trim() && lastName.trim());

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <>
    {admin === true ? (
      <SignUpForm 
        step={1}
        isValid={isValid}
        onContinue={() => navigate('/administrationsignup/step-2')}
      >
        <label className='auth-form__label'>
          <span className="auth-form__label-text">First name</span>
          <input
            className='auth-form__input'
            value={firstName}
            placeholder='Enter your first name'
            onChange={(e) => setFirstName(capitalize(e.target.value))}
          />
        </label>

        <label className='auth-form__label'>
          <span className="auth-form__label-text">Last name</span>
          <input
            className='auth-form__input'
            value={lastName}
            placeholder='Enter your last name'
            onChange={(e) => setLastName(capitalize(e.target.value))}
          />
        </label>
      </SignUpForm>
    ) : (
      <SignUpForm 
        step={1}
        isValid={isValid}
        onContinue={() => navigate('/signup/step-2')}
      >
        <label className='auth-form__label'>
          <span className="auth-form__label-text">First name</span>
          <input
            className='auth-form__input'
            value={firstName}
            placeholder='Enter your first name'
            onChange={(e) => setFirstName(capitalize(e.target.value))}
          />
        </label>

        <label className='auth-form__label'>
          <span className="auth-form__label-text">Last name</span>
          <input
            className='auth-form__input'
            value={lastName}
            placeholder='Enter your last name'
            onChange={(e) => setLastName(capitalize(e.target.value))}
          />
        </label>
      </SignUpForm>
        )
      }
    </>
  );
};

export default SignUpStep1;
