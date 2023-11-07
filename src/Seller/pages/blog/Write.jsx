import './index.scss'
import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Wrapper from '../../../components/wrapper/Wrapper';
import useLoggedInUser from '../../../Globals/useLoggedInUser';
import API_BASE_URL from '../../../Globals/apiConfig';

import { Editor } from '@tinymce/tinymce-react';
export default function Write() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [teacher_id, setUserId] = useState('');
  const [nameError, setNameError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { deptId, userId } = useLoggedInUser();
  const [categories, setCategory] = useState("General");
  const [blogUri, setBlogUri] = useState('');
  const [titleError, setTitleError] = useState('');
  const [tags, setTags] = useState("#OfijanBlogs");
  const [author, setAuthor] = useState("Ofijan");


  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  useEffect(() => {
    setBlogUri(`${API_BASE_URL}/add_post`);
    setUserId(userId);
  }, []);
  const handleEditorChange = (content, editor) => {
    setBody(content);
  };
  const handleSubmit = async () => {

    setTitleError('')

    if (title.trim() === '') {
      setTitleError('Title is required');
      return;
    }
    try {
      const response = await fetch(blogUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, tags, author, categories, body }),
      });

      if (response.ok) {
        console.log(response);
        console.log('Blog data sent successfully!');
        // Reset the form fields
        setTitleError('');
        setTitle('');
        setBody('');
        setSuccessMessage('Blog added successfully!');
      } else {
        console.log(response);
        console.log('Failed to send blog.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="topic">
      <h3>Write New Blog</h3>

      <section className="login">
        <Wrapper>
          <div className="login__container">
            <div className="form2">
              <div className="form-contents1">
                <div className="department">
                  <div className="fnames">
                    <label>Category</label>
                    <select className="dept" name="categories" value={categories} onChange={handleCategoryChange}>
                      <option value="Exam">Exam</option>
                      <option value="Education">Education</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Sport">Sport</option>
                      <option value="Tech">Tech</option>
                    </select>
                  </div>
                </div>
                <div className="department">
                  <div className="fnames">
                    <label>Blog Title</label>
                    <input
                      type="text"
                      name='title'
                      placeholder="How to pass difficult exams"
                      className="dept"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} />
                    <div className="errormessage">{nameError}</div>
                  </div>
                  <div className="fnames">

                    <label>Add Blog text here: </label>
                    <Editor
                      value={body}
                      className="dept" 
                      name="body"
                      id='body'
                      onEditorChange={handleEditorChange}
                      // onChange={(e) => setQuestionText(e.target.value)}
                      apiKey='no1p57zpyjhhqjd9l5i03o52suh9n0vbklw8njdgdoramilj'
                      init={{
                        height: '300', plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                          { value: 'First.Name', title: 'First Name' },
                          { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                      }}
                    // initialValue="Type the question here!"
                    />

                  </div>

                </div>
                <div className="summit-signup">
                  <button className='sigbtn' onClick={handleSubmit}>Save</button>
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
