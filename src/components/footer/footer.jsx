import './footer.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Copyright } from '@material-ui/icons';
import Feedback from 'react-bootstrap/esm/Feedback';

const Footer = () => {
  return (
    <Wrapper className="footer">
      <Feedback />
      <div className="footer__text">
        <h3>Learn, Study & Test Your Study with <span>Ofijan</span></h3>
        <p><Copyright /> Team Ofijan <span>2024</span></p>
      </div>
      <ul className="footer__links">
        <li><Link className="footer_link" to="/about-us">About Us</Link></li>
        <li><Link className="footer_link" to="/termsofservice">Terms Of Service</Link></li>
        <li><Link className="footer_link" to="/privacy">Privacy Policy</Link></li>
      </ul>
    </Wrapper>
  );
};

export default Footer;
