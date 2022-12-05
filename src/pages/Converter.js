import React, {
  useEffect,
} from 'react';
import '../stylesheets/converter.css';

import API_KEYS from '../data/API.json';

//const CURRENCY_API =`https://api.apilayer.com/currency_data/convert?to=${currencyTo.value}&from=${currencyFrom.value}&amount=${inputFrom.value}`;


function Converter() {
  let inputFrom;
  let inputTo;
  let currencyFrom;
  let currencyTo;

  let conversionRates = {};

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates();
    inputFrom = document.getElementById('convertFrom');
    inputTo = document.getElementById('convertTo');
    currencyFrom = document.getElementById('currencyFrom');
    currencyTo = document.getElementById('currencyTo');
  }, [])

  function getConversionRates () {
    const CURRENCY_API = 'https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP';

    let myHeaders = new Headers();
    myHeaders.append("apikey", API_KEYS.Converter_APIKEY);

    const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch(CURRENCY_API, requestOptions)
      .then(response => response.json())
      .then(data => data.quotes)
      .then(result => {
        Object.entries(result).map(entry => {
          const currency = entry[0][3] + entry[0][4] + entry[0][5]
          conversionRates[currency] = entry[1];

          currencyFrom.innerHTML += `<option value="${currency}">${currency}</option>`
          currencyTo.innerHTML += `<option value="${currency}">${currency}</option>`
        });
      })
  };

  function convert() {

    // If you convert from the same currency it just returns the same value.
    if (currencyFrom.value === currencyTo.value) {
      inputTo.value = inputFrom.value;
      return;
    };
    
    const rate = () => {
      let from;
      let to;

      // Since the base currency from the API is USD i just set the value to 1:
      if (currencyFrom.value === 'USD') from = 1;
      else from = conversionRates[currencyFrom.value];

      if (currencyTo.value === 'USD') to = 1;
      else to = conversionRates[currencyTo.value];

      // Calculates to convertion rate by dividing the currency values compared to USD.
      return to / from;
    }  
    
    inputTo.value = rate() * inputFrom.value; 
  };

  return (
    <div className="container">
      <h1 className='converter-title'>Currency Converter</h1>
      <form>

        <div className="input-group">
          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyFrom">
              <option value="USD">USD</option>
            </select>
          </div>
          <div className='form-floating'>
            <input className="form-control" onChange={convert} type="number" id="convertFrom" placeholder="Amount"></input>
            <label htmlFor="convertFrom" className='form-label'>Convert from</label>
          </div>

          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyTo">
              <option value="USD">USD</option>
            </select>
          </div>
          <div className='form-floating'>
            <input disabled className="form-control" type="number" id="convertTo" placeholder=""></input>
            <label htmlFor="convertTo" className='form-label'>Convert to</label>
          </div>
        </div>

      </form>
    </div>
  );
}

export default Converter;
