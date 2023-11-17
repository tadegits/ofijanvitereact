import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Exam from "./pages/exam/Exam";
import AddExam from "./pages/exam/AddExam";
import Topic from "./pages/topic/Topic";
import AddTopic from "./pages/topic/AddTopic";
import Reference from "./pages/reference/Reference";
import AddReference from "./pages/reference/AddReference";
import Question from "./pages/question/Question";
import AddQuestion from "./pages/question/AddQuestion";
import SelectExam from "./pages/question/SelectExam";
import EducationLevel from "./pages/EducationLevel/EducationLevel";
import SellerMain from "./pages/SellerMain/SellerMain";
import Experience from "./pages/Experience/Experience";

import WriteBlog from "./pages/blog/write";
import EditBlog from "./pages/blog/Edit";
import BlogAnalytics from "./pages/blog/Analytics"

import Resume from "./pages/Resume/Resume";
import Document from "./pages/Document/Document";
import Seller from '../components/Seller/Seller';


function index() {
  
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* blogs */}
          <Route exact path="/write_blog" element={<WriteBlog/>} />
          <Route exact path="/edit_blog" element={<EditBlog />} />
          <Route exact path="/blog_analytics" element={<BlogAnalytics />} />
          {/* exams */}
          <Route exact path="/exams" element={<Exam />} />
          <Route exact path="/add_exams" element={<AddExam />} />
          {/* topics */}
          <Route exact path="/topics" element={<Topic />} />
          <Route exact path="/add_topics" element={<AddTopic />} />
          {/* references  */}
          <Route exact path="/references" element={<Reference />} />
          <Route exact path="/add_references" element={<AddReference />} />
          {/* questions */}
          <Route exact path="/questions" element={<Question />} />
          <Route exact path="/add_questions" element={<AddQuestion />} />
          <Route exact path="/select_exam" element={<SelectExam/>} />
          {/* Education Level */}
          <Route exact path="/educationlevel" element={<EducationLevel />} />
          <Route exact path="/resume" element={<Resume />} />
          <Route exact path="/document" element={<Document />} />
          <Route exact path="/mainseller" element={<SellerMain />} />
          {/* Experience */}
          <Route exact path="/experience" element={<Experience />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/seller" element={<Seller/>} />
        </Routes>
      </div>
    </>
  );
}

export default index;
