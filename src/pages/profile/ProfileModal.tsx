import { useState } from 'react';
import { isEmailValid } from '../.../../../utils/validators';

import './ProfileModal.scss';
import crossIcon from '../../assets/cross.svg';

type ModalType = 'email' | 'phone' | 'password';

interface Props {
  type: ModalType;
  onClose: () => void;
}

export const ProfileModal = ({ type, onClose }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const isActive = Boolean(value);

  const titleMap: Record<ModalType, string> = {
    email: 'Change email',
    phone: 'Change phone number',
    password: 'Change password',
  };

  const labelMap: Record<ModalType, string> = {
    email: 'Enter new email',
    phone: 'Enter new phone number',
    password: 'Enter new password',
  };

  const placeholderMap: Record<ModalType, string> = {
    email: 'email@example.com',
    phone: '+380...',
    password: '********',
  };

  const buttonMap: Record<ModalType, string> = {
    email: 'Verify email',
    phone: 'Verify phone',
    password: 'Verify password',
  };

  const handleSubmit = () => {
    if (type === 'email' && !isEmailValid(value)) {
      setError(true);
      return;
    }

    // переход на наступну модалку с кодом
    console.log('Open verification code modal');
  };
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal__header'>
          <h2 className='modal__title'>{titleMap[type]}</h2>

          <button className='modal__close' onClick={onClose}>
            <img src={crossIcon} alt='Close' />
          </button>
        </div>

        <div className='modal__body'>
          <div className='modal__label-row'>
            <label className='modal__label'>{labelMap[type]}</label>
            {error && <span className='modal__error'>Invalid {type}</span>}
          </div>

          <input
            className={`modal__input ${error ? 'modal__input--error' : ''}`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            type={type === 'password' ? 'password' : 'text'}
            placeholder={placeholderMap[type]}
          />
        </div>

        <button
          className={`modal__submit ${isActive ? 'modal__submit--active' : ''}`}
          onClick={handleSubmit}
        >
          {buttonMap[type]}
        </button>
      </div>
    </div>
  );
};
