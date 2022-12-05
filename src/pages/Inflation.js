import React, {
  useEffect
} from 'react';

function Inflation() {
  const convert = null
  return (
    <>
      <form>
        <div className="input-group">
          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyFrom">
              <option value="USD">USD</option>
            </select>
          </div>
          <div className='form-floating'>
            <input className="form-control" onChange={convert} type="number" id="convertFrom" placeholder="Amount"></input>
            <label htmlFor="convertFrom" className='form-label'>Convert from</label>
          </div>

          <div className="input-group-text">
            <select className="form-select" onChange={convert} name="currency" id="currencyTo">
              <option value="USD">USD</option>
            </select>
          </div>
          <div className='form-floating'>
            <input disabled className="form-control" type="number" id="convertTo" placeholder=""></input>
            <label htmlFor="convertTo" className='form-label'>Convert to</label>
          </div>
        </div>
      </form>
    </>
  )
};

export default Inflation;