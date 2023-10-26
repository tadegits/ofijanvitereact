import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./question.scss";
import Wrapper from '../../../components/wrapper/Wrapper'
export default function Question() {
  return (
    <div className="question">
      <h1>We add Question here</h1>
      <section className="login">
        <Wrapper>
          <div className="login__container">
            <div className="form2">

              <div className="form-contents1">
                <div className="names">
                  <div className="fnames">
                    <label>First Name</label>
                    <input type="text" placeholder='First Name' className="fname" required />
                    <div className="errormessage"></div>
                  </div>
                  <div className="lnames">
                    <label>Last Name</label>
                    <input type="text" placeholder='Last Name' className="lname" required />
                    <div className="errormessage"></div>
                  </div>

                </div>
                <div className="department">
                  <label>Department</label>
                  <select name='department' className='dept' required>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Science">Information Science</option>
                    <option value="Information System">Information System</option>
                    <option value="Plant Science">Plant Science</option>
                  </select>
                </div>
                <label>Password</label>
                <input type="password" placeholder='Password' className="pass" required />
                <div className="errormessage"></div>
                <label>Confirm Password</label>
                <input type="password" placeholder='Confirm-Password' className="copass" required />
                <div className="errormessage"></div>
                <div className="errormessage"></div>
                <div className="summit-signup">
                  <button className='sigbtn'  >Sing Up</button>
                  {/* <input type="submit" value="Log In" className="sigbtn"/> */}
                </div>
                
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
