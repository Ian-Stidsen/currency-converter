import API_KEYS from '../data/currencyAPI.json';

export function apiResponse () {
  const CURRENCY_API = 'https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP';

  let myHeaders = new Headers();
  myHeaders.append("apikey", API_KEYS.Converter_APIKEY);

  const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
  }
  return (
    fetch(CURRENCY_API, requestOptions)
      .then(response => response.json())
      .then(data => data.quotes)
  );
};