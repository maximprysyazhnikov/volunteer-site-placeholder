import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';
import { isNameValid } from '../../../utils/validators';
import { useSignUp } from '../../../context/SignUpContext';

<<<<<<< HEAD
type Props = {
  admin: boolean;
}

const SignUpStep1 = ({admin}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
=======
const SignUpStep1 = () => {
  const { data, setFirstName, setLastName } = useSignUp();
  const { first_name: firstName, last_name: lastName } = data;

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

>>>>>>> 3e69daa1cfb9b5fe618711fd9b3bdfb89d317eed
  const navigate = useNavigate();

  const isFilled = Boolean(firstName.trim() && lastName.trim());

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleContinue = () => {
    const firstValid = isNameValid(firstName);
    const lastValid = isNameValid(lastName);

    setFirstNameError(!firstValid);
    setLastNameError(!lastValid);

    if (!firstValid || !lastValid) return;

    navigate('/signup/step-2');
  };

  return (
<<<<<<< HEAD
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
=======
    <SignUpForm step={1} isValid={isFilled} onContinue={handleContinue}>
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>First name</span>
          {firstNameError && (
            <span className='auth-form__error'>Must contain only letters</span>
          )}
        </span>

        <input
          className={`auth-form__input ${firstNameError ? 'auth-form__input--error' : ''}`}
          value={firstName}
          placeholder='Enter your first name'
          onChange={(e) => {
            setFirstName(capitalize(e.target.value));
            setFirstNameError(false);
          }}
        />
      </label>

      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Last name</span>
          {lastNameError && (
            <span className='auth-form__error'>Must contain only letters</span>
          )}
        </span>

        <input
          className={`auth-form__input ${lastNameError ? 'auth-form__input--error' : ''}`}
          value={lastName}
          placeholder='Enter your last name'
          onChange={(e) => {
            setLastName(capitalize(e.target.value));
            setLastNameError(false);
          }}
        />
      </label>
    </SignUpForm>
>>>>>>> 3e69daa1cfb9b5fe618711fd9b3bdfb89d317eed
  );
};

export default SignUpStep1;
