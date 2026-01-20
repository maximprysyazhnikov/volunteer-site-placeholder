import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';

const SignUpStep1 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const isValid: boolean = Boolean(firstName.trim() && lastName.trim());

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <SignUpForm
      step={1}
      isValid={isValid}
      onContinue={() => navigate('/signup/step-2')}
    >
      <label className='auth-form__label'>
        First name
        <input
          className='auth-form__input'
          value={firstName}
          onChange={(e) => setFirstName(capitalize(e.target.value))}
        />
      </label>

      <label className='auth-form__label'>
        Last name
        <input
          className='auth-form__input'
          value={lastName}
          onChange={(e) => setLastName(capitalize(e.target.value))}
        />
      </label>
    </SignUpForm>
  );
};

export default SignUpStep1;
