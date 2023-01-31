import './Footer.css';
import { Logo, Heading } from '../../components';

export const Footer = () => {
  return (
    <footer>
      <Logo
        className="logo-footer"
        src="https://ik.imagekit.io/zenius/Coursera/html-css/Asset_14_4x_d1Yk7QBPiW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674426270880"
        height="60px"
      />

      <section className="footer-menu">
        <Heading tag="h4" size="base">
          Menu
        </Heading>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Reservations</li>
            <li>Order</li>
          </ul>
        </nav>
      </section>

      <section className="footer-contact">
        <Heading tag="h4" size="base">
          Contact
        </Heading>
        <div>
          <p>2548 Matthews Street, Chicago, Illinois - 60631</p>
          <p>815-582-5830</p>
          <p>contact@littlelemon.com</p>
        </div>
      </section>

      <section className="footer-social">
        <Heading tag="h4" size="base">
          Social Media
        </Heading>
        <nav>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Snapchat</li>
            <li>Yelp</li>
            <li>Uber Eats</li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};
