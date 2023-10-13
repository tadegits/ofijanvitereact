import './ExitExam.scss'
import Wrapper from '../wrapper/Wrapper'
import Img1 from '../../assets/resource1.png'
import Img2 from '../../assets/resource2.png'
import Img3 from '../../assets/resource3.png'
import Img4 from '../../assets/resource4.png'
import Img5 from '../../assets/resource5.png'
import Img6 from '../../assets/resource6.png'

const ExitExam = () => {
  return <section className="exams">
    <Wrapper>
      <div className="exams__text">
        <h3>Exit Exam</h3>
        <p>
          Select your field of study!
          <form>
        <input 
        type="text"
        placeholder="Enter your Email"
        className="Email"/>
        <input type="submit"
        value="submit"
        className="button-primary"/>
    </form>
          </p>

      </div>
      <div className="features__container">
        <div className="features__feature dark-feature">
          <img src={Img1} width={200} alt="" />
          <h4 className="dark-feature-title">
            Computer science
          </h4>
          <p>
            PhD holders and professional lecturesrs prepared computer science model exit exam questions will make you prepapre yourself for the actual exam. 
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