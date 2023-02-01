import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {
  faUserCircle,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { Logo, Icon } from '../../components';
import { BurgerMenu } from './components';
import { useWindowResize } from '../../hooks';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  /**********************************************************************************/
  /** Handle SideEffects */
  /**********************************************************************************/

  const { windowWidth } = useWindowResize();
  const { direction } = useScrollDirection();

  /** Show Hide Menu based on windowWidth */
  useEffect(() => {
    if (windowWidth > 768) {
      setShowMenu(true);
    } else setShowMenu(false);
  }, [windowWidth]);

  /** Add classes based on Burger Menu open/close state */
  useEffect(() => {
    if (showMenu) {
      menuRef.current?.classList.add('open');
      menuRef.current?.classList.remove('close');
    } else {
      menuRef.current?.classList.add('close');
      menuRef.current?.classList.remove('open');
    }
  }, [showMenu]);

  /** Enable feature: Click outside to close */
  useEffect(() => {
    const handler = ({ target }) => {
      if (
        target.closest('nav#LL-HeaderMenu') === menuRef.current ||
        target.closest('button#LL-BurgerMenu') === burgerRef.current
      )
        return;
      else setShowMenu(false);
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  /**********************************************************************************/
  /** Handle Events */
  /**********************************************************************************/

  /** Enable Key Accessibility */
  const handleKeys = e => {
    switch (e.key) {
      case 'Escape':
        if (showMenu) setShowMenu(false);
        break;
      default:
        break;
    }
  };

  /**********************************************************************************/
  /** Render JSX */
  /**********************************************************************************/

  return (
    <header data-scroll={direction}>
      {windowWidth < 768 && (
        <BurgerMenu
          ref={burgerRef}
          onClick={() => setShowMenu(prev => !prev)}
          active={showMenu}
          onKeyUp={handleKeys}
          ariaControls="LL-HeaderMenu"
        />
      )}
      <Logo
        className="LL-HeaderLogo"
        src={
          'https://ik.imagekit.io/zenius/Coursera/html-css/Asset_16_4x_nnQ67G1HkI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674426270946'
        }
        height={windowWidth > 768 && windowWidth < 840 ? '50px' : '60px'}
      />

      {showMenu && (
        <nav id="LL-HeaderMenu" className="LL-Navigation" ref={menuRef}>
          <ul className="LL-NavigationMenuList">
            <li>
              <Link title="Home" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link title="About" to="/#about">
                About
              </Link>
            </li>
            <li>
              <a title="Menu" href="/#specials">
                Menu
              </a>
            </li>
            <li>
              <Link
                title="Bookings"
                to="/bookings"
                state={{
                  from: 'navigation',
                }}
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link title="Order" to="/#specials">
                Order
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <nav>
        <ul className="LL-IconsList">
          <li>
            <Icon title="Account" src={faUserCircle} size="xl" />
          </li>
          <li>
            <Icon title="Cart" src={faCartShopping} size="xl" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
