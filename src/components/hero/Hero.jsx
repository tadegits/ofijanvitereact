import './Hero.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/education1.png';
import Img2 from '../../assets/education2.png';
import Img3 from '../../assets/sun1.png';
import Img4 from '../../assets/sun2.png';

const Hero = () => {
  return <section className="hero">
    <Wrapper className='hero__container'>
        <div className="hero__left">
            <h1>Make payment easy, simplify
                finance
            </h1>
            <p>
                top\ofijanvitereact\node_modules\sass\sass.dart.js:87090:16)      
                at _EvaluateVisitor__visitDynamicImport_closure2.call$0 
                (C:\Users\Gedlu\Desktop\ofijanvitereact\node_modules\sass\sass.dart.js:86971:19)
                at C:\Users\Gedlu\Desktop\ofijanvitereact\node_modules\sass\sass.dart.js:85406:45 (x2)
            </p>

            <div className="hero__btn-container">
                <a href="#" className="button-primary">
                    Get Started - it's free
                </a>
                <a href="#" className="button-outline">
                    How it's works
                </a>
            </div>
        </div>

        <div className="hero__right">
            <img src={Img1} alt="" className="img-1" />
            <img src={Img2} alt="" className="img-2" />
            <img src={Img3} alt="" className="img-3" />
        </div>
    </Wrapper>
  </section>
}

export default Hero