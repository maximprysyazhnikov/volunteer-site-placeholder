import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm'
import { useState } from 'react';

export default function AdminStep3() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');

  const isValid: boolean = Boolean(firstName.trim());
  
  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <SignUpForm
      step={3}
      isValid={isValid}
      onContinue={() => navigate('/administrationsignup/step-4')}
      path='administrationsignup'
    >
      <label className='auth-form__label'>
        <span className="auth-form__label-text">Secret Code</span>
        <input
          className='auth-form__input'
          value={firstName}
          placeholder='enter secret code for admins success'
          onChange={(e) => setFirstName(capitalize(e.target.value))}
        />
      </label>
    </SignUpForm>
  )
}
