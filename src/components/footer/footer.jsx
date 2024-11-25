import './footer.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Copyright} from '@material-ui/icons';
import Feedback from 'react-bootstrap/esm/Feedback';
import Logo from '../../assets/yellow.png'

const Footer = () => {
  return (
    <footer>
    <Wrapper className="footer">
      {/* <Feedback /> */}
      <div className="wedego">
      <img src={Logo} className='logo'/>  
      <div className="footer">
        <div className="footer__text">
        <h3>Learn, Study & Test Your Limit with Ofijan</h3>
       <p><Copyright /> OFIN TECH <span>2024</span></p>
       
      </div>
      <ul className="footer__links">
        <li><Link className="footer_link" to="/about-us">About Us</Link></li>
        <li><Link className="footer_link" to="/termsofservice">Terms Of Service</Link></li>
        <li><Link className="footer_link" to="/privacy">Privacy Policy</Link></li>
      </ul>
      </div>
      </div>
      
      
    </Wrapper>
    </footer>
  );
};

export default Footer;
