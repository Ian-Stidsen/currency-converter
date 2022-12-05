import React, {
  useEffect
} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import API_KEYS from '../data/API.json'

function Rates() {
  let conversionRates = {};

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

    function getConversion () {
      return fetch(CURRENCY_API, requestOptions)
        .then(response => response.json())
        .then(data => data.quotes);
    }

    async function responseHandler () {
      const response = await getConversion();
      conversionRates = response;
    }
    responseHandler();
  };


  return (
    <BootstrapTable>
      <TableHeaderColumn dataField='currency' isKey={true}>USD</TableHeaderColumn>
      <TableHeaderColumn dataField='value'>1</TableHeaderColumn>
    </BootstrapTable>
  )
};

export default Rates;