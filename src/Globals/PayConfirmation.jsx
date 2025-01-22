import React from 'react'
import './payConfirmation.scss';
import Pay from '../logedin/payment/Pay';
import useLoggedInUser from './useLoggedInUser';
const PayConfirmation = () => {
  const {userId} = useLoggedInUser();
  return (
    <div className='content'>
        <div className="content_holder">
       <h4>Register as a Member to keep{userId} browsing ofijan</h4> 
       <div className="payment_section">
        <h4><u>Membership Fee 100 ETB</u></h4>
        <h2>Payment Steps</h2>

        <p>Use the following Accounts to transfer</p>
        <p>a. Telle Birr 0905405875 - Dagim</p>
        <p>a. Commercial bank of Ethiopia 1000243061001- Million</p>
        <p>Send the screeshot to 0905405875 on telegram or text the confirmation message</p>
       </div>
       <div className="help_center">
        <Pay fname="million" examId="1" amount="123" email="simemillion@gmail.com" lname="sime" />
        <div className="telegram">Write your feadback Telegram</div>
       </div>
        </div>
        
        </div>
  )
}

export default PayConfirmation