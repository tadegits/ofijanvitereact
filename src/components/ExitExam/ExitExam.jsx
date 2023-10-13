import '../featuresSection/FeaturesSection.scss'
import Wrapper from '../wrapper/Wrapper'
import Img1 from '../../assets/resource1.png'
import Img2 from '../../assets/resource2.png'
import Img3 from '../../assets/resource3.png'
import Img4 from '../../assets/resource4.png'
import Img5 from '../../assets/resource5.png'
import Img6 from '../../assets/resource6.png'

const ExitExam = () => {
  return <section className="features">
    <Wrapper>
      <div className="features__text">
        <h3>Exit Exam</h3>
        <p>
          Lose john poor same it case do year we Full how way even sigh Extremely nor furniture fat questions now provision incommode.
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

        <div className="features__feature white-feature">
          <img src={Img4} width={200} alt="" />
          <h4 className="white-feature-title">
            No Hidden Fees
          </h4>
          <p>
            Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>

        <div className="features__feature dark-feature">
          <img src={Img5} width={200} alt="" />
          <h4 className="dark-feature-title">
            Automatic card lock/unlock
          </h4>
          <p>
            Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>

        <div className="features__feature white-feature">
          <img src={Img6} width={200} alt="" />
          <h4 className="white-feature-title">
            24/7 Customer Support
          </h4>
          <p>
            Engaged was the evident pleased husband. Ye goodness falicity does disposal dwellin no.
          </p>
        </div>

      </div>
    </Wrapper>
  </section>
}

export default ExitExam