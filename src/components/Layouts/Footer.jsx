import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>We are a leading e-commerce platform offering a wide range of products to cater to your needs. Our mission is to provide the best online shopping experience.</p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className={styles.footerLinks}>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="col-md-3">
            <h5>Customer Service</h5>
            <ul className={styles.footerLinks}>
              <li><Link to="/shipping">Shipping & Delivery</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/track">Track Order</Link></li>
              <li><Link to="/support">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className={styles.footerLinks}>
              <li><a href="mailto:support@example.com">kp19@gmail.com</a></li>
              <li><a href="tel:+1234567890">+91 234 567 890</a></li>
              <li>1234 Street Name, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p className={styles.socialIcons}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </p>
            <p>&copy; {new Date().getFullYear()} kpArt19. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
