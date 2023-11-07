import React, {useState, useEffect} from 'react'

function Pay(fname,lname,email,amount, public_key,tx_ref, title) {
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
  }, []);
    return (
        <div>


             <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
                <input type="hidden" name="public_key" value="CHAPUBK_TEST-awyvtaEfHkG3crEKM4uLlCwX2vP7ytnK" />
                <input type="hidden" name="tx_ref" value={randomString} />
                <input type="hidden" name="amount" value={fname.amount} />
                <input type="hidden" name="currency" value="ETB" />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="first_name" value={fname} />
                <input type="hidden" name="last_name" value={lname} />
                <input type="hidden" name="title" value={title} />
                <input type="hidden" name="description" value="Paying with Confidence with cha" />
                <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
                <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
                <input type="hidden" name="return_url" value="http://localhost:3000/" />
                <input type="hidden" name="meta[title]" value="test" />
                <button type="submit" className='button-outline'>Buy</button>
            </form> 
        </div>
    )
}

export default Pay
