import React, { useContext } from 'react'
import { ShopContext } from '../Contaxt/ShopContext'

const Product = () => {
  const products = useContext(ShopContext)
  console.log( products.id)
  return (
    <div>Product</div>
    
  )
}

export default Product