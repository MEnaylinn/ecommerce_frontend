import React from 'react'
import AddressCart from './AddressCard'
import AddShippingAddress from './AddShippingAddress'

const shipping = () => {
  return (
    <div>
    <div>
      <AddressCart/>
    </div>
    <div>
    <AddShippingAddress/>
    </div>
  </div>
  )
}

export default shipping