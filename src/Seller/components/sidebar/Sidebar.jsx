import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AccountCircle,
  ShoppingCart,
  School, 
  Book, 
  AccountBalance,
} from "@material-ui/icons";
import { FaUser, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import QuizSharpIcon from '@mui/icons-material/QuizSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import TopicSharpIcon from '@mui/icons-material/TopicSharp';
import TokenIcon from '@mui/icons-material/Token';
import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";


export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [role, setRole] = useState("");
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
      setRole(parseInt(roleUser.user.role_id))
    }
  }, []);
  const handleMenuClick = (item) => {
    setIsExpanded(!isExpanded);
    setActiveItem(item);
  };
  if(role===1)
  {
    return (
    
      <div className="sidebar">
        <div className="sidebarWrapper">
        <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('dashboard')}>
              Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </ul>
          </div>
          <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('reference')}>Manage References</h3>
            <ul className="sidebarList">
              <Link to="/references" className="link">
                <li className="sidebarListItem">
                  <TokenIcon className="sidebarIcon" />
                  All References
                </li>
              </Link>
              <Link to="/add_references" className="link">
                <li className="sidebarListItem">
                  <TopicSharpIcon className="sidebarIcon" />
                  Add Reference
                </li>
              </Link>
            </ul>
          </div>
          <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={handleMenuClick} >Manage Topic/Courses</h3>
            <ul className="sidebarList">
              <Link to="/add_topics" className="link">
                <li className="sidebarListItem">
                  <TokenIcon className="sidebarIcon" />
                  Add Topic
                </li>
              </Link>
              <Link to="/topics" className="link">
                <li className="sidebarListItem">
                  <TopicSharpIcon className="sidebarIcon" />
                  All Topics
                </li>
              </Link>
            </ul>
          </div>
          <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" >Manage Exams</h3>
            <ul className="sidebarList">
              <Link to="/add_exams" className="link">
                <li className="sidebarListItem">
                  <TokenIcon className="sidebarIcon" />
                  Add Exam
                </li>
              </Link>
              <Link to="/exams" className="link">
                <li className="sidebarListItem">
                  <TopicSharpIcon className="sidebarIcon" />
                  All Exams
                </li>
              </Link>
            </ul>
          </div>
          <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" >Manage Questions</h3>
            <ul className="sidebarList">
              <Link to="/select_exam" className="link">
                <li className="sidebarListItem">
                  <TokenIcon className="sidebarIcon" />
                  Add Question
                </li>
              </Link>
              <Link to="/questions" className="link">
                <li className="sidebarListItem">
                  <TopicSharpIcon className="sidebarIcon" />
                  All Questions
                </li>
              </Link>
            </ul>
          </div>
          <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle"  >Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                Mail
              </li>
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div>
         
        </div>
      </div>
    );
  }
  else{
    return (
    
    <div className="sidebar">
      <div className="sidebarWrapper">
      <div className={`sidebarMenu ${isExpanded ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('dashboard')}>
              Education Background</h3>
            <ul className="sidebarList">
              <Link to="/educationlevel" className="link">
                <li className="sidebarListItem">
                  <School className="sidebarIcon" />
                  Add Education Level
                </li>
              </Link>
              <li className="sidebarListItem">
                <AccountBalance className="sidebarIcon" />
                Work Expereince
              </li>
              <li className="sidebarListItem">
                <FaBriefcase className="sidebarIcon" />
                Add your Resume
              </li>
              <li className="sidebarListItem">
                <Book className="sidebarIcon" />
                Add your Document
              </li>
            </ul>
          </div>
          </div>
    </div>
  );
  }
  
}
