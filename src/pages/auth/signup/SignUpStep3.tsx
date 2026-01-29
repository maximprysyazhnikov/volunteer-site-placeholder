import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
<<<<<<< HEAD
import AdminStep3 from './AdminStep3';

type Props = {
  admin: boolean;
}

const SignUpStep3 = ({admin}: Props) => {
  const [role, setRole] = useState<'volunteer' | 'requester' | null>(null);
=======
import { useSignUp } from '../../../context/SignUpContext';

const SignUpStep3 = () => {
  const { data, setRole } = useSignUp();
  const { role } = data;

>>>>>>> 3e69daa1cfb9b5fe618711fd9b3bdfb89d317eed
  const navigate = useNavigate();

  const isValid = Boolean(role);

  return (
<<<<<<< HEAD
    <>
    {admin === true ? (
      <AdminStep3 
       />
        ) : <SignUpForm
          step={3}
          isValid={isValid}
          onContinue={() => navigate('/signup/step-4')}
        >
          <div className="auth-form__radio-group">
            <span className="auth-form__radio-title">I want to:</span>

            <label className="auth-form__radio">
              <input
                type="radio"
                name="role"
                checked={role === 'volunteer'}
                onChange={() => setRole('volunteer')}
              />
              <span>Provide help (Volunteer)</span>
            </label>

            <label className="auth-form__radio">
              <input
                type="radio"
                name="role"
                checked={role === 'requester'}
                onChange={() => setRole('requester')}
              />
              <span>Request help</span>
            </label>
          </div>
        </SignUpForm>
      }
    </>
=======
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
>>>>>>> 3e69daa1cfb9b5fe618711fd9b3bdfb89d317eed
  );
};

export default SignUpStep3;
