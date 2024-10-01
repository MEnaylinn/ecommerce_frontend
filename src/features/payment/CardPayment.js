import card from "../../assets/image/card.jpg";
import CardShortcut from "./CardShortcut";
import { Link } from "react-router-dom";

const CardPayment = ({selected,onClick,billingAddress,userPayment,onCardSelection,selectedCard}) => {

  console.log('Payment with Credit Card')

  let cards = ''
  if(selected){
    console.log(selectedCard)
    cards = userPayment.map((user)=> 
    (
        <div className="row gap-3 mx-1 mt-2" key={user.id}>
        <div className="card col bg-info" onClick={()=> onCardSelection(user.id)}>
              <p className="ms-5 mt-3">{user.cardNo}</p>
              <input type="radio" className="form-check-input me-2"
               checked = {user.id === selectedCard}
               onChange={()=>{onCardSelection(user.id)}}
               />
              <p className="ms-5">Credit/Debit Card</p>
        </div>
      </div>
      )
    )
      
    

    // cardForm = (
    //   <CardRegister/>
    // )
      
  }

  return (
    <div>
      <div className="text-center" onClick={onClick}>
        <div className="border px-3 py-3 mt-2 bg-info">
          <div className="mb-2">
            <img src={card} alt="card" className="credit-card" />
            <span className="fs-5 ms-3">Credit/Debit Card</span>
          </div>
          <CardShortcut/>
          <div className="text-end"><Link to={'/payment/create'} state={{billingAddress}}  >Tap here to add card</Link></div>
        </div>
      </div>
            {cards}
      </div>
  );
};

export default CardPayment;
