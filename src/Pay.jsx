import React, { useState, useEffect } from 'react';
import API_BASE_URL from './Globals/apiConfig';
import axios from 'axios';
import ExitExam from './logedin/ExitExam/ExitExam';

function Pay({ fname }) {
  console.log("sold product", fname.examId);
  const [chapaCheckoutUri, setCheckoutUri] = useState('https://api.chapa.co/v1/hosted/pay');
  const [first_name, setFirstName] = useState(fname.fname);
  const [last_name, setLastName] = useState(fname.lname);
  const [email, setEmail] = useState(fname.email);
  const [amount, setAmount] = useState(fname.amount);
  const [title, setTitle] = useState(fname.title);
  const [return_url, setReturnUrl] = useState('');
  const [soldItemId, setSoldItemId] = useState('');
  const [authorization_token, setAuthorisation] = useState('CHASECK_TEST-b9IkCyM7dXIrfxCkgdOb5GV4vGR8TTkJ');


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
    setSoldItemId(fname.examId)
    setReturnUrl(`http://localhost:3000/payment/${newRandomString}/${fname.fname}`);
  }, [soldItemId]);
  console.log("title", soldItemId);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here
  };

  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-awyvtaEfHkG3crEKM4uLlCwX2vP7ytnK" />
        <input type="hidden" name="tx_ref" value={randomString} />
        <input type="hidden" name="amount" value={100} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={first_name} />
        <input type="hidden" name="last_name" value={last_name} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="description" value="Paying with Confidence with cha" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value={`https://api.chapa.co/v1/transaction/verify/${randomString}`} />
        <input type="hidden" name="return_url" value={return_url} />
        <input type="hidden" name="meta[title]" value="test" />
        <button type="submit" className='button-outline'>Buy</button>
      </form>

    </div>
  )
}

export default Pay
