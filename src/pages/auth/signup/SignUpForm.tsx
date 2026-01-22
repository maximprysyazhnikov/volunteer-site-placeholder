import { Link } from 'react-router-dom';
import arrowLeft from '../../../assets/arrow-left.svg';

type Props = {
  step: number;
  isValid: boolean;
  onContinue: () => void;
  children: React.ReactNode;
};

const SignUpForm = ({ step, isValid, onContinue, children }: Props) => {
  return (
    <div className='auth-layout__container auth-form'>
      <div className='auth-form__header'>
        <h1 className='auth-form__title'>Create an Account</h1>
        <p className='auth-form__subtitle'>
          Join Wings of Help to request or provide help.
        </p>
      </div>

      <div className='auth-form__step'>
        {step > 1 && (
          <Link to={`/signup/step-${step - 1}`} className='auth-form__back'>
            <img src={arrowLeft} alt='Back' />
          </Link>
        )}
        <span>Step {step} of 4</span>
      </div>

      <div className='auth-form__fields'>{children}</div>

      <div className='auth-form__actions auth-form__actions--signup'>
        <button
          className={`auth-form__button ${isValid ? 'auth-form__button--active' : ''}`}
          disabled={!isValid}
          onClick={onContinue}
          type='button'
        >
          Continue
        </button>

        <div className='auth-form__signin'>
          <span>Already have an account?</span>
          <Link to='/signin' className='auth-form__signin-link'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
