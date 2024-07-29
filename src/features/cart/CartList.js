import React from 'react'
import CartItem from './CartItem'

const CartList = ({items}) => {
  
  return (
    <div>
    {items.map((item) => <CartItem key={item.id} item = {item}/>)}
  </div> 
  )
}

export default CartList