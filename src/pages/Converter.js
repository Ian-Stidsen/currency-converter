import React, {
  useEffect,
  useState,
  useMemo
} from 'react';
import '../stylesheets/converter.css';

import API_KEYS from '../data/API.json';

//const CURRENCY_API =`https://api.apilayer.com/currency_data/convert?to=${currencyTo.value}&from=${currencyFrom.value}&amount=${inputFrom.value}`;


function Converter() {

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates();
  }, [])

  const [rates, setRates] = useState({USD: 1})
  const [currencyCodes, setCurrencyCodes] = useState([<option key='USD' value='USD'>USD</option>]);

  const [convertFromValue, setConvertFromValue] = useState(0);
  const [convertToValue, setConvertToValue] = useState(0);

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
          setRates((prevState) => ({
            ...prevState,
            [currency]: entry[1]
          }))
          setCurrencyCodes((prevState) => ([
            ...prevState,
            <option key={currency} value={currency}>{currency}</option>
          ]))
        });
      });
  };

  const convert = () => {

    const inputFrom = document.getElementById('convertFrom');
    const inputTo = document.getElementById('convertTo');
    const currencyFrom = document.getElementById('currencyFrom');
    const currencyTo = document.getElementById('currencyTo');

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
      else from = rates[currencyFrom.value];

      if (currencyTo.value === 'USD') to = 1;
      else to = rates[currencyTo.value];

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
              {currencyCodes}
            </select>
          </div>
          <div className='form-floating'>
            <input className="form-control" onChange={convert} type="number" id="convertFrom" placeholder="Amount"></input>
            <label htmlFor="convertFrom" className='form-label'>Convert from</label>
          </div>

          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyTo">
              {currencyCodes}
            </select>
          </div>
          <div className='form-floating'>
            <input className="form-control" type="number" id="convertTo" placeholder=""></input>
            <label htmlFor="convertTo" className='form-label'>Convert to</label>
          </div>
        </div>

      </form>
    </div>
  );
}

export default Converter;
