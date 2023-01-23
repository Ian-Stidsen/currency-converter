import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Helmet } from 'react-helmet';

import { apiResponse } from '../components/apiResponse';

export function Rates() {

  const comparedValueRef = useRef('1 USD')

  const [rates, setRates] = useState([{currency: '1 USD', value: 1 + ' USD'}]);

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates()
  }, [])
  const getConversionRates = async() => {
    setRates([{currency: '1 USD', value: 1 + ' USD'}]);
    const promise = await apiResponse();

    Object.entries(promise).map(entry => {
      const currency = entry[0].slice(3, entry[0].length);
      const value = 1 / entry[1];

      setRates((prevState) => ([
        ...prevState,
        {
        currency: '1 ' + currency,
        value: value.toFixed(4) + ' USD'
        }
      ]));
      return null;

    });

  };

  const change = () => {
    getConversionRates();
    console.log(comparedValueRef.current.value)
  }

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
          <select ref={comparedValueRef} onChange={change}>
            {rates.map(rate => {
              return <option key={rate.currency} value={rate.currency}>{rate.currency}</option>
            })}
          </select>
        </TableHeaderColumn>
      </BootstrapTable>
    </>
  )
};