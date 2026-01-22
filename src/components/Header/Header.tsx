import { useTranslation } from 'react-i18next';
import { LangChanger } from '../LangChanger/LangChanger';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className='header'>
      <nav className='header__nav'>
        <div className='header__nav__wings-sector'>
          <img src='src/assets/header_logo_image.svg' alt='header-logo' />
          <p className='header__nav__wings-sector__title'>Wings of help</p>
        </div>

        <div className='header__nav__pages'>
          <div className='header__nav__pages__page'>
            <p className='header__nav__pages__page__title'>{t('Requests')}</p>
          </div>
          <div className='header__nav__pages__page'>
            <p className='header__nav__pages__page__title'>{t('Offers')}</p>
          </div>
        </div>

        <div className='header__nav__buttons'>
          <LangChanger />

          <Link to='/signin'>
            <button className='header__nav__buttons__button sign-in'>
              {t('Sign-in')}
            </button>
          </Link>

          <Link to='/signup'>
            <button className='header__nav__buttons__button sign-up'>
              {t('Sign-up')}
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
