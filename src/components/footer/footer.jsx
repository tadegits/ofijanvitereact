import './footer.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Copyright } from '@material-ui/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="footer__text">
          <h3>Learn, Study & Test Your Limit with Ofijan</h3>
          <p className='ofin_tech'>
            <Copyright /> OFIN TECH <span>2024</span>
          </p>
        </div>
        <ul className="footer__links">
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/termsofservice">Terms of Service</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
        {/* <div className="footer__ads">
          <div className="ads-placeholder">
            Google Ads Placeholder
          </div>
        </div> */}
      </Wrapper>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ofijan",
          "url": "https://ofijan.com",
          "logo": "https://ofijan.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/yourpage",
            "https://www.twitter.com/yourhandle",
          ],
        })}
      </script>
    </footer>
  );
};

export default Footer;
