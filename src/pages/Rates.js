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

  const [rates, setRates] = useState([{currency: 'USD', value: 1}]);

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
        Object.entries(result).map(entry => {
          const currency = entry[0][3] + entry[0][4] + entry[0][5];
          const value = 1 / entry[1]

          setRates((prevState) => (
            [
              ...prevState,
              {
              currency: '1 ' + currency,
              value: value.toFixed(4) + ' USD'
              }
            ]
          ));

        });
      });
  };

  return (
    <>
      <BootstrapTable data={rates} tableStyle={{
        tableLayout: 'auto',
        width: '500px',
      }}>
        <TableHeaderColumn thStyle={{width: '40%', textAlign: 'center'}} dataField='currency' isKey={true}>Currency codes</TableHeaderColumn>
        <TableHeaderColumn thStyle={{textAlign: 'center'}} dataField='value'>Value compared to USD</TableHeaderColumn>
      </BootstrapTable>
    </>
  )
};

export default Rates;