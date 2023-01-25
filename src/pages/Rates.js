import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Helmet } from 'react-helmet';
import { apiResponse } from '../components/apiResponse';
import '../stylesheets/rates.css';

export function Rates() {

  const comparedFromRef = useRef('USD')

  const [rates, setRates] = useState([
    {
      currencyCode: '1 USD', 
      currencyValue: 1 + ' USD', 
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
        currencyCode: '1 ' + currency,
        currencyValue: value.toFixed(8) + ' ' + comparedFromRef.current.value,
        }
      ]));
      return null;

    });

  };

  const changeComparation = () => {
    const compareFrom = comparedFromRef.current.value;

    const compareRate = rates.filter(rate => {
      if (rate.currencyCode.split(' ')[1] !== compareFrom) return null;
      return rate.currencyValue;
    })

    const comparedvalue = compareRate[0].currencyValue.split(' ')[0]
    setRates(prevState => {
      const newState = prevState.map(rate => {
        const currencyCode = rate.currencyCode.split(' ')[1];
        const currencyValue = rate.currencyValue.split(' ')[0];

        const rateCalculation = (parseFloat(currencyValue) / comparedvalue).toFixed(8) + ' ' + compareFrom;
        if (compareFrom === currencyCode) {
          return {...rate, currencyValue: rate.currencyCode};
        }

        return {...rate, currencyValue: rateCalculation};
      });
      return newState;
    });

  };

  return (
    <>
      <Helmet><title>Converter | Rates</title></Helmet>
      <BootstrapTable data={rates} tableStyle={{
        tableLayout: 'auto',
        width: '500px',
        maxWidth: '80vw'
      }}>
        <TableHeaderColumn thStyle={{width: '50%', textAlign: 'center'}}
        dataField='currencyCode' isKey={true}>
          Compare value from
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={{textAlign: 'center'}} dataField='currencyValue'>
          <select id='compareSelect' ref={comparedFromRef} onChange={changeComparation}>
            {rates.map(rate => {
              const currencyCode = rate.currencyCode.split(' ')[1]
              return <option key={currencyCode} value={currencyCode}>{currencyCode}</option>
            })}
          </select>
        </TableHeaderColumn>
      </BootstrapTable>
    </>
  )
};