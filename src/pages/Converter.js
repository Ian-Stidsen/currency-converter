import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import '../stylesheets/converter.css';

import { Helmet } from 'react-helmet';

import { apiResponse } from '../components/apiResponse';

export function Converter() {

  // Runs the API once when the page is loaded.
  const [rates, setRates] = useState({USD: 1})
  const [currencyCodes, setCurrencyCodes] = useState([<option key={'USD'} value='USD'>USD</option>]);

  const currencyFrom = useRef('USD');
  const currencyTo = useRef('USD');

  const inputFrom = useRef(0);
  const inputTo = useRef(0);

  useEffect(() => {
    async function getConversionRates() {
      const promise = await apiResponse();
  
      Object.entries(promise).map(entry => {
        const currency = entry[0].slice(3, entry[0].length);
        
        setRates((prevState) => ({
          ...prevState,
          [currency]: entry[1]
        }));
        
        setCurrencyCodes((prevState) => ([
          ...prevState,
          <option key={currency} value={currency}>{currency}</option>
        ]));
        
      });
    };
    getConversionRates();
  }, [])


  const convert = () => {
    const currencyFromValue = currencyFrom.current.value;
    const currencyToValue = currencyTo.current.value;
    const inputFromValue = inputFrom.current.value;

    const rate = rates[currencyToValue] / rates[currencyFromValue];
    const result = inputFromValue * rate;

    inputTo.current.value = result;
  };

  const swapCurrencies = () => {
    const tempCurrency = currencyFrom.current.value; 
    currencyFrom.current.value =  currencyTo.current.value;
    currencyTo.current.value = tempCurrency;

    convert();
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh'
  }

  return (
    <>
      <Helmet><title>Converter | Currency</title></Helmet>
      <div className="container" style={containerStyle}>
        <h1 className='converter-title'>Currency Converter</h1>
        <form>

          <div className="input-group">
            <div className="input-group-text">
              <select ref={currencyFrom} className="form-select" onChange={convert} name="currency" id="currencyFrom">
                {currencyCodes}
              </select>
            </div>
            <div className='form-floating'>
              <input ref={inputFrom} className="form-control" onChange={convert} type="number" id="inputFrom" placeholder=""></input>
              <label htmlFor="convertFrom" className='form-label'>Convert from {currencyFrom.value}</label>
            </div>

            <button type='button' onClick={swapCurrencies} id='swapButton' className='form-button'>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-switch-horizontal" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline points="16 3 20 7 16 11"></polyline>
                <line x1="10" y1="7" x2="20" y2="7"></line>
                <polyline points="8 13 4 17 8 21"></polyline>
                <line x1="4" y1="17" x2="13" y2="17"></line>
              </svg>
            </button>

            <div className='form-floating'>
              <input ref={inputTo} readOnly className="form-control" type="number" id="inputTo" placeholder=""></input>
              <label htmlFor="convertTo" className='form-label'>Convert to {currencyTo.value}</label>
            </div>
            <div className="input-group-text">
              <select ref={currencyTo} className="form-select" onChange={convert} name="currency" id="currencyTo">
                {currencyCodes}
              </select>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}
