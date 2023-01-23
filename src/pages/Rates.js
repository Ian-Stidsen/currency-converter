import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Helmet } from 'react-helmet';

import { apiResponse } from '../components/apiResponse';

export function Rates() {

  const comparedFromRef = useRef('USD')

  const [rates, setRates] = useState([
    {
      currency: 'USD', 
      value: 1, 
    }
  ]);

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates()
  }, [])

  const getConversionRates = async() => {
    // Makes sure this function only runs once because useEffect runs twice.
    if (rates.length > 1) return;
    const promise = await apiResponse();

    Object.entries(promise).map(entry => {
      const currency = entry[0].slice(3, entry[0].length);
      const value = 1 / entry[1];

      setRates((prevState) => ([
        ...prevState,
        {
        currency: currency,
        value: value.toFixed(4),
        }
      ]));
      return null;

    });

  };

  const changeComparation = () => {
    const compareFrom = comparedFromRef.current.value;

    const compareRate = rates.filter(rate => {
      if (rate.currency !== compareFrom) return null;
      return rate.value;
    })

    const comparedvalue = compareRate[0].value
    setRates(prevState => {
      const newState = prevState.map(rate => {
        return (
          {...rate, value: (rate.value / comparedvalue)}
        )
      })
      return newState;
    })

  };

  window.addEventListener('click', () => {
    //console.log(rates)
  })

  return (
    <>
      <Helmet><title>Converter | Rates</title></Helmet>
      <BootstrapTable data={rates} tableStyle={{
        tableLayout: 'auto',
        width: '500px',
      }}>
        <TableHeaderColumn thStyle={{width: '50%', textAlign: 'center'}}
        dataField='currency' isKey={true}>
          Compare value from
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={{textAlign: 'center'}} dataField='value'>
          <select ref={comparedFromRef} onChange={changeComparation}>
            {rates.map(rate => {
              return <option key={rate.currency} value={rate.currency}>{rate.currency}</option>
            })}
          </select>
        </TableHeaderColumn>
      </BootstrapTable>
    </>
  )
};