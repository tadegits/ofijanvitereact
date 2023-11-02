import './Hero.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/education1.png';
import Img2 from '../../assets/education2.png';
import Img3 from '../../assets/sun1.png';
import Img4 from '../../assets/sun2.png';
import anim from "../../assets/animation_lnk8tp8u.json"
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
const Hero = () => {
   
        const [text, setText] = useState('The Ethiopian Exam Bank!');
      
        useEffect(() => {
          const interval = setInterval(() => {
            // Change the text after 20 seconds
            setText('A Place to confirm Your Study');
          }, 20000);
      
          return () => clearInterval(interval);
        }, [text])
    
  return <section className="hero">
    <Wrapper className='hero__container'>
        <div className="hero__left">
            <h1>
                {text}
            </h1>
            <p>
            Revolutionize Your Exam Preparation with Our Cutting-Edge Exam Selling Website. Unleash your potential with our comprehensive collection of exam resources, meticulously crafted to meet your specific needs.
            </p>

            <div className="hero__btn-container">
                <a href="/signup" className="button-primary">
                    Join Us
                </a>
                <Link to={'/Login'} state={{name:'seller'}} className='button-outline'>
                  Be Seller
                </Link>
                {/* <a href="/Login" className="button-outline">
                    
                </a> */}
            </div>
        </div>

        <div className="hero__right">
            <div><Lottie animationData={anim} className='img-1'/></div>
         
        </div>
    </Wrapper>
  </section>
}

export default Hero