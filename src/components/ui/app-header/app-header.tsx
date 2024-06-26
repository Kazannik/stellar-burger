import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation, useMatch } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const profile = useMatch('/profile');
  const order = useMatch('/profile/orders');
  const orderNumber = useMatch('/profile/orders/:number');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <Link
              className={clsx(
                styles.link,
                currentLocation === '/'
                  ? [styles.link_active, styles.link]
                  : styles.link
              )}
              to={'/'}
            >
              <BurgerIcon
                type={currentLocation === '/' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <Link
              className={clsx(
                styles.link,
                currentLocation === '/feed'
                  ? [styles.link_active, styles.link]
                  : styles.link
              )}
              to={'/feed'}
            >
              <ListIcon
                type={currentLocation === '/feed' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon
            type={profile || order || orderNumber ? 'primary' : 'secondary'}
          />
          <Link
            className={clsx(
              profile || order || orderNumber
                ? [styles.link_active, styles.link]
                : styles.link
            )}
            to={'/profile'}
          >
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
