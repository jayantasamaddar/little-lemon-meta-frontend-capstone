import './Footer.css';
import { Logo, Heading, SocialMediaWidget } from '../../components';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <Logo
        className="LL-FooterLogo"
        src="https://ik.imagekit.io/zenius/Coursera/html-css/Asset_14_4x_d1Yk7QBPiW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674426270880"
        height="60px"
      />

      <section className="LL-FooterMenu">
        <Heading tag="h4" size="base">
          Menu
        </Heading>
        <nav className="LL-Navigation LL-FooterNavigation">
          <ul>
            <li>
              <Link title="Home" to="/">
                Home
              </Link>
            </li>
            <li>
              <a title="About" href="/#about">
                About
              </a>
            </li>
            <li>
              <a title="Menu" href="/#specials">
                Menu
              </a>
            </li>
            <li>
              <Link title="Bookings" to="/bookings">
                Bookings
              </Link>
            </li>
            <li>
              <a title="Order" href="/#specials">
                Order
              </a>
            </li>
          </ul>
        </nav>
      </section>

      <section className="LL-FooterContact">
        <Heading tag="h4" size="base">
          Contact
        </Heading>
        <article>
          <p>2548 Matthews Street, Chicago, Illinois - 60631</p>
          <p>815-582-5830</p>
          <p>contact@littlelemon.com</p>
        </article>
      </section>

      <section className="LL-FooterSocial">
        <Heading tag="h4" size="base">
          Social Media
        </Heading>
        <nav className="LL-Navigation LL-FooterNavigation">
          <SocialMediaWidget />
        </nav>
      </section>
    </footer>
  );
};
