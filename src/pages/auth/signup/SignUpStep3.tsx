import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { useSignUp } from '../../../context/SignUpContext';

const SignUpStep3 = () => {
  const { data, setRole } = useSignUp();
  const { role } = data;
  
  const navigate = useNavigate();

  const isValid = Boolean(role);

  return (
    <SignUpForm
      step={3}
      isValid={isValid}
      onContinue={() => navigate('/signup/step-4')}
    >
      <div className='auth-form__radio-group'>
        <span className='auth-form__radio-title'>I want to:</span>

        <label className='auth-form__radio'>
          <input
            type='radio'
            name='role'
            checked={role === 'volunteer'}
            onChange={() => setRole('volunteer')}
          />
          <span>Provide help (Volunteer)</span>
        </label>

        <label className='auth-form__radio'>
          <input
            type='radio'
            name='role'
            checked={role === 'distressed'}
            onChange={() => setRole('distressed')}
          />
          <span>Request help</span>
        </label>
      </div>
    </SignUpForm>
  );
};

export default SignUpStep3;
