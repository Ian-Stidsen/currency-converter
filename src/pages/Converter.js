import React from 'react';
import '../stylesheets/converter.css';

// gqjPO77bb3QuF5fCZ4LRMAdHH9Adt2M7
// https://api.apilayer.com/currency_data/convert?to={DDK}&from={USD}&amount={1}

// https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,USD,DDK


function Converter() {
  let inputFrom;
  let inputTo;
  let currencyFrom;
  let currencyTo;

  window.addEventListener('load', () => {
    inputFrom = document.getElementById('convertFrom');
    inputTo = document.getElementById('convertTo');
    currencyFrom = document.getElementById('currencyFrom');
    currencyTo = document.getElementById('currencyTo');
  });

  function convert () {
    const CURRENCY_API =`https://api.apilayer.com/currency_data/convert?to=${currencyTo.value}&from=${currencyFrom.value}&amount=${inputFrom.value}`;

    let myHeaders = new Headers();
    myHeaders.append("apikey", "gqjPO77bb3QuF5fCZ4LRMAdHH9Adt2M7");

    const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    function getConversion () {
      return fetch(CURRENCY_API, requestOptions)
        .then(response => response.json())
        .then(data => data.result);
    }

    async function responseHandler () {
      const response = await getConversion();
      inputTo.value = response;
    }

    responseHandler()
  }
  return (
    <div className="container">
    <form>
      <label htmlFor="convertFrom">Convert from</label>
      <div className="input-group">
        <div className="input-group-text">
          <select className="form-select" onChange={convert} name="currency" id="currencyFrom">
            <option value="DKK">DKK</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <input className="form-control" onChange={convert} type="number" id="convertFrom" placeholder="Amount"></input>
      </div>

      <label htmlFor="convertTo">Convert to</label>
      <div className="input-group">
        <div className="input-group-text">
          <select className="form-select" onChange={convert} name="currency" id="currencyTo">
            <option value="DKK">DKK</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <input className="form-control" type="number" id="convertTo" placeholder="Amount"></input>
      </div>
    </form>
  </div>
  );
}

export default Converter;
