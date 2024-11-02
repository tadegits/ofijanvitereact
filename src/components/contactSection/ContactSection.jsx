// ContactSection.js
import './ContactSection.scss';
import Wrapper from '../wrapper/Wrapper';
import TelegramIcon from '@mui/icons-material/Telegram';
import TikTokIcon from '@mui/icons-material/EmojiEmotions'; // Use appropriate TikTok icon or custom SVG
import { Link } from 'react-router-dom';
import { FaTiktok } from "react-icons/fa";
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
    description: "Join our Telegram group for updates, discussions, and support.",
    backgroundClass: "dark-contact",
    titleClass: "dark-contact-title",
    icon: <TelegramIcon />,
    link: "https://t.me/yourtelegramlink",
  },
  {
    title: "TikTok",
    description: "Follow us on TikTok for engaging educational content and updates.",
    backgroundClass: "white-contact",
    titleClass: "white-contact-title",
    icon: <FaTiktok />,
    link: "https://www.tiktok.com/@yourtiktokhandle",
  },
];

export default ContactSection;
