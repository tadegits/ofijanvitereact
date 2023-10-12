import './SiteSection.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/education3.png';
import Img2 from '../../assets/education4.png';
import Img3 from '../../assets/student.png';

const sites = [
    {
        title: "How to learn practice using different questions",
        tag: "Service",
        img: Img1,
        date: 'October 12, 2023'
    },

    {
        title: "How to student get service from ofijan.com",
        tag: "Student",
        img: Img3,
        date: 'October 14, 2023'
    },
    
    {
        title: "Passing exam require hard work, Practice on provided questions",
        tag: "Service",
        img: Img2,
        date: 'October 16, 2023'
    }
]

const SiteSection = () => {
  return (
    <section className="site">
        <Wrapper>
            <div className="site__text">
                <h3>Explore our Resources</h3>
                <p>
                    Registor to practice using different questions, to test your performance.
                </p>
             </div>
             <div className="site__container">
                {sites.map((site) => (
                    <div className="site__card">
                        <div className="site__card-img">
                            <img src={site.img} alt="" />
                        </div>
                        <div className="site__tag">
                            {site.tag}
                        </div>
                        <div className="site__title">
                            {site.title}
                        </div>
                        <h6>
                            {site.date}
                        </h6>
                    </div>
                ))}
             </div>

             <div className="site__btn">
                <a href="#" className="button-primary">See All Site</a>
             </div>
        </Wrapper>
    </section>
  );
}

export default SiteSection