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
import Question from "./pages/question/index";

function index() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
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

          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default index;
