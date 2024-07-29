import React, { useState } from 'react'
import CardShortcut from "./CardShortcut";

const CardRegister = ({onClick}) => {
  const [cardNumber,setCardNumber] = useState('')
  const [holder,setHolder] = useState('')
  const [expMonth,setExpMonth] = useState('')
  const [expYear,setExpYear] = useState('')
  const [ccv,setCCV] = useState('')

  const onCardNumberChange =(e)=> setCardNumber(e.target.value)
  const onHolderChange  =(e)=> setHolder(e.target.value)
  const onExpMonthChange  =(e)=> setExpMonth(e.target.value)
  const onoExpYearChange  =(e)=> setExpYear(e.target.value)
  const onCCVChange  =(e)=> setCCV(e.target.value)

  const canCreate = [cardNumber,holder,expMonth,expYear,ccv].every(Boolean)

  const onCardDetail = ()=>{
    if(canCreate){
      onClick({
        card:{
          holder,
          cardNumber,
          expMonth,
          expYear,
          ccv
        }
      })
    }
  }

  return (
    <div>
        {/* Card Register Form */}
      <div className="container items-center bg-light mb-5 mt-3" >
        <p className="fs-4 fw-bold"> Credit/Debit Card</p>
        <p className="fs-5 fw-bold text-center">Add New Card</p>

        <form className="card bg-light">
          <div className="text-end"><CardShortcut/></div>
          <div className="mb-3">
            <label htmlFor="cardNo" className="form-label">
              Card number
            </label>
            <input type="number" className="form-control" id="cardNo" onChange={onCardNumberChange} value={cardNumber} />
          </div>


          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name on card
            </label>
            <input type="text" className="form-control" id="name" onChange={onHolderChange} value={holder} />
          </div>

          
          <div className="mb-3">
            <label htmlFor="expMonth" className="form-label">
              Expiration (MM/YY)
            </label>
            <div className="d-flex align-items-center text-center">
            <input type="number" className="form-control" id="expMonth" onChange={onExpMonthChange} value={expMonth} />
            <div className="fs-2 text-center">/</div>
            <input type="number" className="form-control" id="expYear" onChange={onoExpYearChange} value={expYear} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input type="number" className="form-control" id="cvv" onChange={onCCVChange} value={ccv}/>
          </div>
          <button onClick={onCardDetail} className="btn btn-primary mt-2">
            Save Card
          </button>
        </form>
      </div>
    </div>
  )
}

export default CardRegister