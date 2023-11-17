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
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useLoggedInUser from '../../../Globals/useLoggedInUser';

export default function Sidebar() {
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const { deptId, userId } = useLoggedInUser();
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
      setRole(parseInt(roleUser.user.role_id))
    }
  }, [role]);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const handleMenuClick = (menu) => {
    if (expandedMenu === menu) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menu);
    }
  };
  if (role === 2) {
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
          <div className={`sidebarMenu ${expandedMenu === 'reference' ? 'expanded' : ''} `}>
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
          <div className={`sidebarMenu ${expandedMenu === 'topic' ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('topic')} >Manage Topic/Courses</h3>

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
          <div className={`sidebarMenu ${expandedMenu === 'exams' ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('exams')}>Manage Exams</h3>
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
          <div className={`sidebarMenu ${expandedMenu === 'questions' ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('questions')}>Manage Questions</h3>

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
          {/* <div className={`sidebarMenu ${expandedMenu === 'notifications' ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() =>handleMenuClick('notifications')} >Notifications</h3>
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
          </div> */}
          {/* <div className={`sidebarMenu ${expandedMenu === 'staff' ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() =>handleMenuClick('staff')}>Staff</h3>
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
          </div> */}
          <div className={`sidebarMenu ${expandedMenu === 'blog_w' ? 'expanded' : ''}`}>
            <h3 className="sidebarTitle" onClick={() => handleMenuClick('blog_w')}>Blog Writer</h3>
            <ul className="sidebarList">
              <Link to="/write_blog" className="link">
                <li className="sidebarListItem">
                  <WorkOutline className="sidebarIcon" />
                  Write
                </li>
              </Link>
              <Link to="/edit_blog" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Edit
              </li>
              </Link>
              <Link to="/blog_analytics" className="link">
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Analytics
              </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  else if(role === 2){
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
              <Link to="/experience" className="link">
                  <li className="sidebarListItem">
                    <AccountBalance className="sidebarIcon" />
                    Work Expereince
                  </li>
              </Link>
              <Link to="/resume" className="link">
                <li className="sidebarListItem">
                  <FaBriefcase className="sidebarIcon" />
                  Add your Resume
                </li>
              </Link>
              <Link to="/document" className="link">
                <li className="sidebarListItem">
                  <Book className="sidebarIcon" />
                  Add your Document
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}
