import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <section>
        <img
          src="https://ik.imagekit.io/zenius/Coursera/html-css/Asset_14_4x_d1Yk7QBPiW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674426270880"
          alt="Little Lemon - Secondary Logo"
          height={60}
        />
      </section>

      <section className="footer-menu">
        <h4>Menu</h4>
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
        <h4>Contact</h4>
        <p>2548 Matthews Street, Chicago, Illinois - 60631</p>
        <p>815-582-5830</p>
        <p>contact@littlelemon.com</p>
      </section>

      <section className="footer-social">
        <h4>Social Media Links</h4>
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
