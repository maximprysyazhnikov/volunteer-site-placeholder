import './Profile.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import profileFoto from '../../assets/Profile_foto.svg';
import infoIcon from '../../assets/profile2.svg';
import requestsIcon from '../../assets/HandsPraying.svg';
import responsesIcon from '../../assets/ArrowsClockwise.svg';
import logoutIcon from '../../assets/logout.svg';
// import uploadIcon from '../../assets/upload.svg';

const userFromServer = {
  firstName: 'Cody',
  lastName: 'Warren',
  email: 'cody.warren@example.com',
  phone: '+38012-345-67-89',
  role: 'Requester',
};

const ProfilePage = () => {
  const [originalUser, setOriginalUser] = useState(userFromServer);
  const [form, setForm] = useState(userFromServer);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // тут буде очистка токена
    logout();
    navigate('/');
  };

  const isDirty =
    form.firstName !== originalUser.firstName ||
    form.lastName !== originalUser.lastName;

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleSave = () => {
    setOriginalUser(form);
  };

  return (
    <div className='profile'>
      <div className='profile__layout'>
        <aside className='profile__sidebar'>
          <div className='profile__user'>
            <div className='profile__avatar--sidebar'>
              <img src={profileFoto} alt='Profile avatar' />
            </div>
            <div className='profile__user-info'>
              <p className='profile__name'>
                {form.firstName} {form.lastName}
              </p>
              <p className='profile__email'>{form.email}</p>
            </div>
          </div>

          <nav className='profile__menu'>
            <button className='profile__menu-item profile__menu-item--active'>
              <img src={infoIcon} alt='' />
              <span>Personal Information</span>
            </button>

            <button className='profile__menu-item'>
              <img src={requestsIcon} alt='' />
              <span>My Requests</span>
            </button>

            <button className='profile__menu-item'>
              <img src={responsesIcon} alt='' />
              <span>My Responses</span>
            </button>

            <button
              className='profile__menu-item profile__menu-item--logout'
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt='' />
              <span>Log out</span>
            </button>
          </nav>
        </aside>

        <main className='profile__content'>
          <div className='profile__card'>
            <div className='profile__header'>
              <div className='profile__header-top'>
                {/* <div className='profile__avatar'>
                  <img src={profileFoto} alt='Profile avatar' />
                </div> */}
{/* 
                <div className='profile__header-actions'>
                  <button className='profile__upload-btn'>
                    <img src={uploadIcon} alt='' />
                    <span>Upload new image</span>
                  </button>

                  <button className='profile__delete-btn'/>
                </div> */}
              </div>

              <h1 className='profile__title'>Profile</h1>
            </div>

            <div className='profile__form'>
              <label className='profile__field'>
                <span className='profile__label'>First name</span>
                <input
                  className='profile__input'
                  type='text'
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: capitalize(e.target.value) })
                  }
                />
              </label>

              <label className='profile__field'>
                <span className='profile__label'>Last name</span>
                <input
                  className='profile__input'
                  type='text'
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: capitalize(e.target.value) })
                  }
                />
              </label>
              <div className='profile__role'>
                <span className='profile__role-label'>Role:</span>
                <span className='profile__role-value'>Requester</span>
              </div>

              <div className='profile__actions'>
                <button
                  className={`profile__save-btn ${isDirty ? 'profile__save-btn--active' : ''}`}
                  disabled={!isDirty}
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </div>
            </div>

            <div className='profile__contacts'>
              <h2 className='profile__contacts-title'>Contact Information</h2>

              <div className='profile__contact-row'>
                <div className='profile__contact-field'>
                  <span className='profile__contact-label'>Email</span>
                  <input
                    className='profile__contact-input'
                    disabled
                    value={form.email}
                  />
                </div>
                <button className='profile__contact-btn'>Change</button>
              </div>

              <div className='profile__contact-row'>
                <div className='profile__contact-field'>
                  <span className='profile__contact-label'>Phone number</span>
                  <input
                    className='profile__contact-input'
                    disabled
                    value={form.phone}
                  />
                </div>
                <button className='profile__contact-btn'>Change</button>
              </div>

              <div className='profile__contact-row'>
                <div className='profile__contact-field'>
                  <span className='profile__contact-label'>Password</span>
                  <input
                    className='profile__contact-input'
                    disabled
                    value='********'
                  />
                </div>
                <button className='profile__contact-btn'>Change</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
