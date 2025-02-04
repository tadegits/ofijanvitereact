import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../Globals/apiConfig';
import axios from 'axios';
import ExitExam from '../ExitExam/LExitExam';

function Pay({ fname, examId, amount, email, lname}) {
  console.log("sold product", examId);
  const [chapaCheckoutUri, setCheckoutUri] = useState('https://api.chapa.co/v1/hosted/pay');
  const [first_name, setFirstName] = useState(fname.fname);
  const [last_name, setLastName] = useState(fname.lname);
  const [title, setTitle] = useState(fname.title);
  const [return_url, setReturnUrl] = useState('');
  const [soldItemId, setSoldItemId] = useState('');
  const [authorization_token, setAuthorisation] = useState('CHASECK-FYwlnF9lJtD5BrBWuTl1RUZQtFDL0R0C');
  const generateRandomString = () => {
    const length = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  const [randomString, setRandomString] = useState('');
  useEffect(() => {
    const newRandomString = generateRandomString();
    setRandomString(newRandomString);
    setTitle(fname.title)
    setSoldItemId(examId)
    setReturnUrl(`https://ofijan.com/payment/${newRandomString}/${examId}`);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
        <input type="hidden" name="public_key" value="CHAPUBK-n0YmCSg1VHRgLpG7QITKQkFRMgtEdfZU" />
        <input type="hidden" name="tx_ref" value={randomString} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="description" value="Paying with Confidence with cha" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value={`https://api.chapa.co/v1/transaction/verify/${randomString}`} />
        <input type="hidden" name="return_url" value={return_url} />
        <input type="hidden" name="meta[title]" value="test" />
        <button type="submit" className='button-outline' >Pay with Chapa</button>
      </form>
    </div>
  )
}
export default Pay
 