import './FeaturesSection.scss';
import Wrapper from '../wrapper/Wrapper';
import ExploreIcon from '@mui/icons-material/Explore';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <section className="features" aria-labelledby="features-heading">
      <Wrapper>
        
        <div className="features__text">
          <h4>what do we have?</h4>

        </div>
        <div className="features__container">

          {featuresData.map((feature, index) => (
            <div key={index} className={`features__feature ${feature.backgroundClass}`}>
              <ExploreIcon alt={feature.iconAlt} />
              <h1 className={`${feature.titleClass}`}>{feature.title}</h1>
              <p>{feature.description}</p>
            </div>
          ))}

        </div>
      </Wrapper>
    </section>
  );
};

const featuresData = [
  {
    title: "Ethiopian Exit Exam Preparation",
    description: "Ofijan provides comprehensive exam preparation resources, specifically designed for Ethiopian exit exams. Our platform offers a range of study materials, including downloadable past exam papers and guides.",
    backgroundClass: "dark-feature",
    titleClass: "dark-feature-title",
    iconAlt: "Explore icon",
    link: "/exit-exam-preparation",
  },
  {
    title: "Online Exam Practice",
    description: "Engage in online exam practice with a focus on Ethiopian Ministry of Education exam questions. Test your knowledge with free questions tailored to the curriculum.",
    backgroundClass: "white-feature",
    titleClass: "white-feature-title",
    iconAlt: "Explore icon",
    link: "/online-exam-practice",
  },
  {
    title: "Expert Exam Preparation Instructors",
    description: "Benefit from professional exam preparation with expert instructors at Ofijan. Our tutoring services offer personalized guidance, ensuring you have the resources you need for academic success.",
    backgroundClass: "dark-feature",
    titleClass: "dark-feature-title",
    iconAlt: "Explore icon",
    link: "/expert-instructors",
  },
  {
    title: "Customizable Test Preparation",
    description: "Ofijan’s platform allows for customizable test preparation, enabling students to tailor their study aids according to specific subjects. Access a comprehensive exam question bank to enhance your readiness.",
    backgroundClass: "white-feature",
    titleClass: "white-feature-title",
    iconAlt: "Explore icon",
    link: "/customizable-test-preparation",
  },
  {
    title: "Accessible Payment Solutions with Chapa",
    description: "With Chapa payment gateway for Ethiopian students, Ofijan provides a seamless payment experience for accessing premium content. Start practicing for your exit exams today.",
    backgroundClass: "dark-feature",
    titleClass: "dark-feature-title",
    iconAlt: "Explore icon",
    link: "/payment-solutions",
  },
  {
    title: "Engaging Learning Tools",
    description: "Join Ofijan for better exam readiness with interactive exam preparation tools. Subscribe to our YouTube channel and explore exam question archives to support your preparation journey.",
    backgroundClass: "white-feature",
    titleClass: "white-feature-title",
    iconAlt: "Explore icon",
    link: "/learning-tools",
  },
  {
    title: "Success Stories and Testimonials",
    description: "Our platform is trusted by Ethiopian students. Read testimonials and endorsements from students who have successfully prepared for their exams using Ofijan.",
    backgroundClass: "dark-feature",
    titleClass: "dark-feature-title",
    iconAlt: "Explore icon",
    link: "/success-stories",
  },
  {
    title: "Join and Engage with Ofijan",
    description: "Explore our platform and join Ofijan today to experience quality exam preparation. Start learning and testing your knowledge online with our interactive features.",
    backgroundClass: "white-feature",
    titleClass: "white-feature-title",
    iconAlt: "Explore icon",
    link: "/join-us",
  },
  {
    title: "Access Over 10,000+ Ethiopian Exit Exam Questions with Ofijan.",
    description: "Our platform is trusted by Ethiopian students. Read testimonials and endorsements from students who have successfully prepared for their exams using Ofijan.",
    backgroundClass: "dark-feature",
    titleClass: "dark-feature-title",
    iconAlt: "Explore icon",
    link: "/success-stories",
  },
];

export default FeaturesSection;
