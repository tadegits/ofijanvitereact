import './FeaturesSection.scss'
import Wrapper from '../wrapper/Wrapper'
import Img1 from '../../assets/resource1.png'
import Img2 from '../../assets/resource2.png'
import Img3 from '../../assets/resource3.png'

const FeaturesSection = () => {
  return <section className="features">
    <Wrapper>
    <div className="features__text">
        <p>
           6.grade Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>
      <div className="features__container">
        <div className="features__feature dark-feature">
          <img src={Img1} width={200} alt="" />
          <h4 className="dark-feature-title">
            Free Enrollment
          </h4>
          <p>
            Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>

        <div className="features__feature white-feature">
          <img src={Img2} width={200} alt="" />
          <h4 className="white-feature-title">
            Fast and easy registration
          </h4>
          <p>
            Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>

        <div className="features__feature dark-feature">
          <img src={Img3} width={200} alt="" />
          <h4 className="dark-feature-title">
            Crypto Support
          </h4>
          <p>
            Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>

      </div>
      <div className="features__text">
           <p>
           6.grade Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
           </p>
      </div>
    </Wrapper>
  </section>
}

export default FeaturesSection