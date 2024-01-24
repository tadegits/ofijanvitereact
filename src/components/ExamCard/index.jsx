import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/ofijan_logo.png';

const index = ({ exams }) => {
  console.log('recieved exams', exams);

  <Wrapper className="examsholder">


        {exams ? (exams.map((exam, index) => {
          return (
            <div key={exam.id} className="exams_card">
              <div className='exams_head'>
                <img className='__logo' src={Logo} alt='' width={30} height={20} />
                <div className="__title"> {exam.exam_name ? exam.exam_name : "No Name"}</div>
              </div>
              <div className="underline"></div>
              {/* <div className="__department">From: {exam.department_id ? exam.department.title : "Unknown "}. Department!</div> */}
              <table className='exam_table' border={1}>
  <tbody>
    <tr className='table_body'>
      <td className='categorizer'>Booklet Name: </td>
      <td className='info' colSpan={4}><b>{exam.exam_name}</b></td>
    </tr>
    <tr className='table_body'>
      <td className='categorizer'>Ofijan Id: </td>
      <td className='info'><b>OF{exam.id}{exam.id}IN</b></td>
      <td className='categorizer'>Prepared By: </td>
      <td className='info' colSpan={2}><b>Gaki Serocho</b></td>
    </tr>
    <tr className='table_body'>
      <td className='categorizer'>Description </td>
      <td className='info' colSpan={4}>{exam.description ? exam.description : "No Description!"}</td>
    </tr>
    <tr className='table_body'>
      <td className='categorizer'>Total no of Questions </td>
      <td className='info'>{exam.questions_count}</td>
      <td className='categorizer' colSpan={2}>Topics Covered </td>
      <td className='info'>12</td>
    </tr>
    <tr className='table_body'>
    <td className='categorizer topics'>Topics </td>
    <td className='' colSpan={4}>
      <ul>
        <li>___</li>
        <li>___</li>
        <li>___</li>
        {showAll && (
          <>
            <li>___</li>
            <li>___</li>
            <li>___</li>
          </>
        )}
      </ul>
      <span className="dropdown-icon" onClick={toggleTopics}>{!showAll? (<>▼</>) : (<>▲</>)}</span>
    </td>
    </tr>
    <tr className='table_body'>
      <td colSpan={5} className='open-holder'>
        <Link className='button-open' to={`/ofijan_question_plate/${exam.id}`}>
          Open
        </Link>
      </td>
    </tr>
  </tbody>
</table>

            </div>
          )
        })) : (<div className='exams_card'>
          <p>We have no exams for your department. <li>Click Here</li> If you wan't to get notified!</p>
        </div>)}
      </Wrapper>
};

export default index;
