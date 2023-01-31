import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../Logo';

export const Header = () => {
  return (
    <header>
      <Logo
        className="logo-header"
        src="https://ik.imagekit.io/zenius/Coursera/html-css/Asset_16_4x_nnQ67G1HkI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674426270946"
      />

      <nav>
        <ul className="menu-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>About</li>
          <li>
            <a href="/#specials">Menu</a>
          </li>
          <li>
            <Link to="/reservations">Reservations</Link>
          </li>
          <li>Order</li>
        </ul>
      </nav>
      <nav>
        <ul className="icons-list">
          <li>
            <FontAwesomeIcon icon={faUserCircle} size="xl" title="Account" />
          </li>
          <li>
            <FontAwesomeIcon icon={faCartShopping} size="xl" title="Cart" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
