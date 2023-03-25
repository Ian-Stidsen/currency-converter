
export function apiResponse () {
  const CURRENCY_API = 'https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP';
  const API_KEY = process.env.REACT_APP_API_KEY;

  let myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);

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