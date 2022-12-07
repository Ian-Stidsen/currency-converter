import React, {
  useEffect,
  useState,
  useMemo
} from 'react';
import '../stylesheets/converter.css';

import API_KEYS from '../data/API.json';

//const CURRENCY_API =`https://api.apilayer.com/currency_data/convert?to=${currencyTo.value}&from=${currencyFrom.value}&amount=${inputFrom.value}`;


function Converter() {

  function log(log) {console.log(log)};

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates();
  }, [])

  const [rates, setRates] = useState({USD: 1})
  const [currencyCodes, setCurrencyCodes] = useState([<option value='USD'>USD</option>]);

  const [currencyFromValue, setCurrencyFromValue] = useState('USD');
  const [currencyToValue, setCurrencyToValue] = useState('USD');

  const [inputFromValue, setInputFromValue] = useState(0);
  const [inputToValue, setInputToValue] = useState(0);

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
            <option value={currency}>{currency}</option>
          ]))
        });
      });
  };

  const convert = (e) => {
    const value = e.target.value
    const id = e.target.id

    switch(id) {
      case 'currencyFrom':
        setCurrencyFromValue(value);
        calculate(value, currencyToValue, inputFromValue);
        break;

      case 'currencyTo':
        setCurrencyToValue(value);
        calculate(currencyFromValue, value, inputFromValue);
        break;

      case 'inputFrom':
        setInputFromValue(value);
        calculate(currencyFromValue, currencyToValue, value);
        break;

      default:
        calculate(currencyFromValue, currencyToValue, inputFromValue);
        break;
    }
  };
  
  const calculate = (currencyFrom, currencyTo, inputFrom) => {
    const rate = rates[currencyTo] / rates[currencyFrom];
    const result = inputFrom * rate
    setInputToValue(result)
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh'
  }

  return (
    <div className="container" style={containerStyle}>
      <h1 className='converter-title'>Currency Converter</h1>
      <form>

        <div className="input-group">
          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyFrom">
              {currencyCodes}
            </select>
          </div>
          <div className='form-floating'>
            <input className="form-control" onChange={convert} type="number" id="inputFrom" placeholder="" value={inputFromValue}></input>
            <label htmlFor="convertFrom" className='form-label'>Convert from {currencyFromValue}</label>
          </div>

          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyTo">
              {currencyCodes}
            </select>
          </div>
          <div className='form-floating'>
            <input value={inputToValue} readOnly className="form-control" type="number" id="inputTo" placeholder=""></input>
            <label htmlFor="convertTo" className='form-label'>Convert to {currencyToValue}</label>
          </div>
        </div>

      </form>
    </div>
  );
}

export default Converter;
