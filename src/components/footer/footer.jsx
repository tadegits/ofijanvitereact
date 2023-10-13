import './footer.scss'
import Wrapper from '../wrapper/Wrapper'
import PlayStore from "../../assets/google.png";
import Logo from "../../assets/ofijan_negetive.png";


const footer = () => {
  return (
    <section className='footer'>
        <Wrapper>
        <div className='footer__text'>
            <h3> The place to confirm your study!</h3>
            <p>Ofijan</p>
        </div>
        {/* <div className='footer__stores'>
            <img src={PlayStore} alt=""/>
        </div> */}
        <div className='footer__logo'>
            <img src={Logo} alt=""/>
        </div>
        <ul className='footer__links'>
            <li>Services</li>
            <li>Pricing</li>
            <li>Careers</li>
            <li>privacy policy</li>
            <li>FAQS</li>
        </ul>
    </Wrapper>
    </section>
  )
}

export default footer

