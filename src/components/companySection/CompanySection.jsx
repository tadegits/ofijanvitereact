import './CompanySection.scss';
import Wrapper from '../wrapper/Wrapper';
import Company1 from '../../assets/inventory 2.png'
import Company2 from '../../assets/inventory 3.png'
import Company3 from '../../assets/brain2.png'
import Company4 from '../../assets/sun2.png'
import Company5 from '../../assets/brain.png'
import Phone from '../../assets/sun3.png'
import Appstore from '../../assets/moon2.png'
import Playstore from '../../assets/inventory 1.png'
import Bg from '../../assets/logo.png'

const CompanySection = () => {
  return <section className="company">
    <Wrapper>
      <h4>1000,000+ Exit Exam questions and answer!</h4>
      <div className="company__companies">
        <img src={Company1} width={200} alt=""/>
        <img src={Company2} width={200} alt=""/>
        <img src={Company3} width={200} alt=""/>
        <img src={Company4} width={200} alt=""/>
        <img src={Company5} width={200} alt=""/>
      </div>
      <div className="company__container">
        <div className="company__left">
           <img src={Phone} alt="" className='img-1'/>
          <div className="img-2">
            <img src={Appstore} alt="" /> 
          </div>
          <div className="img-3">
            <img src={Playstore} alt="" /> 
          </div>
        </div>
        <div className="company__right">
          <h3>How to get the exams!</h3>
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
     <img src={Bg} alt="" className="company__bg" />
  </section>
}

export default CompanySection