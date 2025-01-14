import './footer.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Copyright } from '@material-ui/icons';

const Footer = () => {
  return (
    <footer className="footer" aria-label="Footer">
      <Wrapper>
        <div className="footer__text">
          <h3>Learn, Study & Test Your Limits with Ofijan</h3>
          <p className="ofin_tech">
            <Copyright /> <span className='company_name'>OFIN TECH</span> <span className='company_name'>2024</span>
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="footer__links">
            <li><Link to="/about-us" aria-label="About Us Page">About Us</Link></li>
            <li><Link to="/terms-of-service" aria-label="Terms of Service Page">Terms of Service</Link></li>
            <li><Link to="/privacy" aria-label="Privacy Policy Page">Privacy Policy</Link></li>
          </ul>
        </nav>
        <div className="footer__socials">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </Wrapper>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ofijan",
          "url": "https://ofijan.com",
          "logo": "https://ofijan.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/yourpage",
            "https://www.twitter.com/yourhandle"
          ]
        })}
      </script>
    </footer>
  );
};

export default Footer;
