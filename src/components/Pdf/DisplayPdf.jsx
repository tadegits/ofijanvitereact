import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Row, Col, Layout, Card } from 'antd';
import PropTypes from 'prop-types';
import API_BASE_URL from '../../Globals/apiConfig';
import Wrapper from '../wrapper/Wrapper';
import ImageGallery from './ImageGallery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayPdf.scss';
import BlogList from '../Blog/BlogList';
import PlaceholderImage from '../../assets/pl.jpeg';
const DisplayPdf = () => {
  const location = useLocation();
  const depts = location.state?.data;  // Ensure this is the department data coming from the location state
  const { id, imageIndex } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [examsData, setExams] = useState([]);
  const [examsError, setExamsError] = useState('');
  const [examLoading, setExamLoading] = useState(false);
  const [blogs, setBlogData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postUri, setPostUri] = useState('');
  const { Content } = Layout;

  useEffect(() => {
    setPostUri(`${API_BASE_URL}/last-three-blogs`);
    axios.get(postUri)
      .then(response => {
        setBlogData(response.data.blogs);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [postUri]);
  const departmentData = [
    { "title": "Accounting", "id": 50 },
    { "title": "Animal-Science", "id": 28 },
    { "title": "Biodiversity", "id": 25 },
    { "title": "Biology", "id": 20 },
    { "title": "Civil-Engineering", "id": 2 },
    { "title": "Computer-Science", "id": 1 },
    { "title": "Construction-Technology-Management", "id": 15 },
    { "title": "EC-Engineering", "id": 51 },
    { "title": "Economics", "id": 10 },
    { "title": "EDPM", "id": 44 },
    { "title": "English-Language-Literature", "id": 37 },
    { "title": "Environmental-Science", "id": 21 },
    { "title": "Forestry", "id": 23 },
    { "title": "Geography", "id": 39 },
    { "title": "Information-Systems", "id": 7 },
    { "title": "Journalism", "id": 41 },
    { "title": "Law", "id": 42 },
    { "title": "Management", "id": 6 },
    { "title": "Marketing", "id": 9 },
    { "title": "Mathematics", "id": 3 },
    { "title": "Pharmacy", "id": 30 },
    { "title": "Physics", "id": 18 },
    { "title": "Sociology", "id": 38 },
    { "title": "Sport", "id": 5 },
    { "title": "Statistics", "id": 17 },
    { "title": "Survey", "id": 14 },
    { "title": "Water-Resource-Engineering", "id": 13 }
  ];

  const deptId = departmentData.find(
    (dept) => dept.title === id
  )?.id;
  const fetchExams = async (departmentId) => {
    setExamLoading(true);
    setExamsError('');
    try {
      const response = await fetch(`${API_BASE_URL}/examsfront/${departmentId}`);
      if (response.ok) {
        const examsData = await response.json();
        setExams(examsData);
      } else {
        throw new Error('Failed to fetch exams.');
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      setExamsError('Failed to load exams for this department. Please try again later.');
    } finally {
      setExamLoading(false);
    }
  };
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/fetchimages/${id}`);
        const fileNames = response.data;
        const urls = Array.isArray(fileNames)
          ? fileNames.map((fileName) => `${API_BASE_URL}/images/${id}/${fileName}`)
          : Object.entries(fileNames).map(([key, value]) => `${API_BASE_URL}/images/${value}`);

        setImageUrls(urls);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams(deptId);
    fetchImageUrls();
  }, [id]);

  // const BlogCard = ({ blog }) => (
  //   <Col xs={24} sm={12} md={24} key={blog.id}>
  //     <Link to={`/blog/${blog.categories}/${blog.title}/full`}>
  //       <Card hoverable className="blog-card">
  //         <img
  //           src={blog.image ? `https://server.ofijan.com/storage/${blog.image}` : PlaceholderImage}
  //           alt={blog.title}
  //           className="blog-image"
  //           loading="lazy"
  //         />
  //         <Card.Meta
  //           description={
  //             <div className="blog-content">
  //               <h6 className="blog-title">{blog.title}</h6>
  //               <p className="blog-category">Published in: {blog.categories}</p>
  //             </div>
  //           }
  //         />
  //         <Link
  //           to={`/blog/${blog.categories}/${blog.title}/full`}
  //           className="read-more-link"
  //         >
  //           Open
  //         </Link>
  //       </Card>
  //     </Link>
  //   </Col>
  // );
  return (
    <section className='pdfs'>
      <Helmet>
        <title>{depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : 'Ethiopian Exit Exam Questions'}</title>
        <meta name="description" content={`Explore the ${depts ? depts.title : 'subject'} Ethiopian Exit Exam Questions.`} />
        <meta property="og:title" content={depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : 'Ethiopian Exit Exam Questions'} />
        <meta property="og:description" content={`Explore the ${depts ? depts.title : 'subject'} Ethiopian Exit Exam Questions.`} />
        <meta property="og:image" content="withmoto.png" />
        <meta property="og:url" content={`${API_BASE_URL}/exit-exam/${depts?.title}/${id}`} />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": depts ? `${depts.title} Ethiopian Exit Exam` : "Ethiopian Exit Exam Questions",
            "description": `Explore a comprehensive collection of ${depts ? depts.title : 'subject'} Ethiopian Exit Exam questions, including various question formats and covering different topics to help you prepare effectively.`,
            "url": `${API_BASE_URL}/exit-exam/${depts?.title}/${id}`,
            "image": imageUrls.length > 0 ? imageUrls[0] : "default_image_url.jpg",
            "provider": {
              "@type": "Organization",
              "name": "Ofijan",
              "sameAs": "https://ofijan.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "free",
              "priceCurrency": "USD",
              "availability": "http://schema.org/InStock",
              "url": `${API_BASE_URL}/exit-exam/${depts?.title}/${id}`
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "name": `${depts?.title} Ethiopian Exit Exam - ${id}`,
              "courseMode": "online",
              "startDate": null, // Remove specific start date
              "endDate": null,  // Remove specific end date
              "identifier": id,
              "location": {
                "@type": "Place",
                "name": "Online",
                "url": `${API_BASE_URL}/exit-exam/${depts?.title}/${id}`
              },
              "courseWorkload": "Varies depending on individual needs",
            }
          })}
        </script>

      </Helmet>
      <Wrapper className='pdf_section'>
        <div className="display-pdf-container">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <div className="get_answers"> {examsData ? <p>Other resources for {id} department</p> : ''}
                {examsdata && examsData.map((exam) => (
                  <Link to={`/exam/details/${exam.id}`} key={exam.id} className="answer-link">
                    <div key={exam.id}>
                      <h2>
                        {exam.exam_name}
                      </h2>
                      <p>{exam.questions_count} questions</p>
                    </div></Link>)
                )}</div>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='pdf__viewer'>
              <h1 className="subjectHeader">{depts ? depts.title : ''} {id} Ethiopian Exit Exam Questions</h1>
              <ImageGallery id={id} imageIndex={imageIndex} />
            </Col>

            <Col xs={24} sm={24} md={6} lg={8} xl={8}>
              <Layout className="blog-layout">
                <Content>
                  <Card bordered={false}>

                      {blogs && blogs.map((blog) => (
                        <BlogCard blog={blog} />
                      ))}
                
                  </Card>
                </Content>
              </Layout>
            </Col>
          </Row>
        </div>
      </Wrapper>
    </section>
  );
};

DisplayPdf.propTypes = {
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  studentName: PropTypes.string
};

export default DisplayPdf;
