import './CompanySection.scss';
import Wrapper from '../wrapper/Wrapper';
import Company1 from '../../assets/inventory 2.png'
import Company2 from '../../assets/inventory 3.png'
import Company3 from '../../assets/brain2.png'
import Company4 from '../../assets/sun2.png'
import Company5 from '../../assets/brain.png'
import Phone from '../../assets/sun3.png'
import Logo from '../../assets/moon.png'
import Ofijan from '../../assets/logo.png'
import moon2 from '../../assets/moon2.png'
import Playstore from '../../assets/inventory 1.png'
import Bg from '../../assets/question.gif'

const CompanySection = () => {
  return <section className="company">
    <Wrapper>
      <hr></hr>
      <h2>1000,000+ Exit Exam questions and answer!</h2>
      <div className="company__companies">
     
      </div>
      <div className="company__container">
        <div className="company__left">
           <img src={Logo} alt="" className='img-1'/>
          <div className="img-2">
            <img src={Logo} alt="" /> 
          </div>
          <div className="img-3">
            <img src={Logo} alt="" /> 
          </div>
        </div>
        <div className="company__right">
          <h1>How to get the exams!</h1>
          <p>
           Simple steps
          </p>
          <div className="company__points-container">
            <div className="company__point">
              <div className="company__point-icon">
                <div>1</div>
              </div>
              <div className="company__point-text">
                Select the course you wanted.
              </div>
            </div>
            <div className="company__point">
              <div className="company__point-icon">
                <div>2</div>
              </div>
              <div className="company__point-text">
                Select Your prefered Payment method
              </div>
            </div>
            <div className="company__point">
              <div className="company__point-icon">
                <div>3</div>
              </div>
              <div className="company__point-text">
                Start test right away.
              </div>
            </div>
          </div>
        </div>
      </div> 
    </Wrapper>
  
  </section>
}

export default CompanySection