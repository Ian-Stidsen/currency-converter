import React, {
  useEffect,
  useState
} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import API_KEYS from '../data/API.json'

function Rates() {

  let conversionRates;

  const ratesData = [
    {
      currency: 'USD',
      value: '1'
    }
  ];

  const [rates, setRates] = useState(ratesData);

  // Runs the API once when the page is loaded.
  useEffect(() => {
    getConversionRates();
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

    // converts the json data into array of objects so bootstrap table can read it
    fetch(CURRENCY_API, requestOptions)
      .then(response => response.json())
      .then(data => data.quotes)
      .then(result => {
        conversionRates = Object.entries(result).map(entry => {
          const currency = entry[0][3] + entry[0][4] + entry[0][5];
          return {currency: currency, value: entry[1] + ' USD'};
        })
        setRates(conversionRates);
      });
  };

  return (
    <>
      <BootstrapTable data={rates} tableStyle={{
        tableLayout: '50%',
        width: '75vw',
      }}>
        <TableHeaderColumn thStyle={{width: '50%'}} dataField='currency' isKey={true}>Currency codes</TableHeaderColumn>
        <TableHeaderColumn dataField='value'>Value compared to USD</TableHeaderColumn>
      </BootstrapTable>
    </>
  )
};

export default Rates;