import { useState, useEffect, useRef, createElement } from 'react';
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

import navigation from '../../settings/cms/navigation.json';

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
    } else {
      setShowMenu(false);
    }
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

  /** Enable feature: Click outside to close (also closes if clicked on menu links) */
  useEffect(() => {
    const handler = ({ target }) => {
      if (
        (target.closest('nav#LL-HeaderMenu') === menuRef.current &&
          target.tagName !== 'A') ||
        target.closest('button#LL-BurgerMenu') === burgerRef.current
      )
        return;
      else setShowMenu(false);
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  /**********************************************************************************/
  /** Accessibility */
  /**********************************************************************************/

  const menuOrientation = {
    'aria-orientation': windowWidth > 768 ? 'horizontal' : 'vertical',
    'aria-hidden': windowWidth < 768 && !showMenu ? 'true' : 'false',
  };

  /** Enable Key Accessibility */
  const handleKeys = e => {
    switch (e.key) {
      // Close expanded mobile menu
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
    <header role="region" aria-label="Header Region" data-scroll={direction}>
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
        <nav
          id="LL-HeaderMenu"
          role="menubar"
          className="LL-Navigation"
          ref={menuRef}
          {...menuOrientation}
        >
          <ul
            className="LL-NavigationMenuList"
            role="menu group"
            {...menuOrientation}
          >
            {navigation.map(({ id, name, title, link, url, state }) => {
              const Element = link === 'internal' ? Link : 'a';
              const linkProps =
                Element === 'a' ? { href: url } : { to: url, state };
              return createElement(
                'li',
                { key: id, name, role: 'menuitem' },
                <Element title={title} {...linkProps}>
                  {title}
                </Element>
              );
            })}
          </ul>
        </nav>
      )}

      <nav role="menubar">
        <ul className="LL-IconsList" role="menu group">
          <li role="menuitem">
            <Icon title="Account" src={faUserCircle} size="xl" />
          </li>
          <li role="menuitem">
            <Icon title="Cart" src={faCartShopping} size="xl" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
