import './ContactSection.scss';
import Wrapper from '../wrapper/Wrapper';
import TelegramIcon from '@mui/icons-material/Telegram';
import { FaTiktok, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="contact" aria-labelledby="contact-heading">
      <Wrapper>
        <div className="contact__text">
          <h2 id="contact-heading">Connect with Us</h2>
          <h4>Follow us on our social media platforms:</h4>
        </div>
        <div className="contact__container">
          {contactData.map((contact, index) => (
            <div key={index} className={`contact__item ${contact.backgroundClass}`}>
              {contact.icon}
              <h1 className={`${contact.titleClass}`}>{contact.title}</h1>
              <p>{contact.description}</p>
              <Link to={contact.link} className="cta-button" target="_blank">Connect</Link>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

const contactData = [
  {
    title: "Telegram",
    description: "Join our Telegram group if you have any questions, discussions, and support.",
    backgroundClass: "dark-contact",
    titleClass: "dark-contact-title",
    icon: <TelegramIcon />,
    link: "https://t.me/OfijanExam",
  },
  {
    title: "TikTok",
    description: "Follow us on TikTok for engaging educational content and updates.",
    backgroundClass: "white-contact",
    titleClass: "white-contact-title",
    icon: <FaTiktok />,
    link: "https://www.tiktok.com/@Ofijan.com",
  },
  {
    title: "YouTube",
    description: "Get our YouTube videos. We provide brief descriptions for your questions!",
    backgroundClass: "white-contact",
    titleClass: "white-contact-title",
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@OfijanExams",
  },
  {
    title: "LinkedIn",
    description: "Connect with us on LinkedIn for professional updates and networking.",
    backgroundClass: "dark-contact",
    titleClass: "dark-contact-title",
    icon: <FaLinkedin />,
    link: "https://linkedin.com/company/ofijan-exams",
  },
];

export default ContactSection;
