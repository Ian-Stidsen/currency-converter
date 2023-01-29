import React, {
  useEffect,
  useState,
  useRef
} from 'react';

import { Helmet } from 'react-helmet';
import { apiResponse } from '../components/apiResponse';
import '../stylesheets/rates.css';

export function Rates() {

  const comparedFromRef = useRef('USD')
  
  // Uses 2 different useStates to not distort values when changing comparison back and forth 
  const [visualRates, setVisualRates] = useState([
    {
      currencyCode: '1 USD', 
      currencyValue: '1 USD', 
    }
  ]);

  const [rateData, setRateData] = useState([
    {
      currencyCode: 'USD', 
      currencyValue: 1, 
    }
  ]);

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates()
  }, [])

  const getConversionRates = async() => {
    // Makes sure this function only runs once because useEffect runs twice.
    if (rateData.length > 1) return;
    const promise = await apiResponse();

    Object.entries(promise).map(entry => {
      const currency = entry[0].slice(3, entry[0].length);
      const value = 1 / entry[1];

      setRateData((prevState) => ([
        ...prevState,
        {
        currencyCode: currency,
        currencyValue: value
        }
      ]));

      setVisualRates((prevState) => ([
        ...prevState,
        {
        currencyCode: '1 ' + currency,
        currencyValue: value.toFixed(8) + ' ' + comparedFromRef.current.value,
        }
      ]));
      return null;

    });

  };

  // Changes currency which you compare from.
  const changeComparation = () => {
    const comparedCurrency = rateData.filter(rate => {
      if (rate.currencyCode !== comparedFromRef.current.value) return null;
      return rate;
    })[0].currencyValue;

    setVisualRates(prevState => {
      const newState = prevState.map(rate => {
        const rateCalculation = rateData.map(data => {
          const currencyCode = rate.currencyCode.split(' ')[1];
          const currencyValue = (data.currencyValue / comparedCurrency).toFixed(8);
          if (data.currencyCode !== currencyCode) return null;
          if (data.currencyCode === comparedFromRef.current.value) return rate.currencyCode;
          return currencyValue + ' ' + comparedFromRef.current.value;

        });
        return {...rate, currencyValue: rateCalculation};

      });
      return newState;

    });

  };

  return (
    <>
      <Helmet><title>Converter | Rates</title></Helmet>
      <table className='table'>
        <thead className='tableheader'>
          <tr>

            <th className='tableHead'>
              Compare rate from
            </th>
            <th className='tableHead'>
              <select id='compareSelect' ref={comparedFromRef} onChange={changeComparation}>
                {rateData.map(rate => {
                  const currencyCode = rate.currencyCode;
                  return <option key={currencyCode} value={currencyCode}>{'To ' + currencyCode}</option>
                })}
              </select>
            </th>
          </tr>

        </thead>
        <tbody className='tableBody'>
          {visualRates.map((rate) => {
            return (
              <tr key={rate.currencyCode}>
                <td className='tableData'>{rate.currencyCode}</td>
                <td className='tableData'>{rate.currencyValue}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
};