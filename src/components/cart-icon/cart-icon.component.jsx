import React,{useContext} from 'react'
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'


const CartIcon = () => {
    const {isCartOpen,setIsCartOpen,cartItems,cartCount } = useContext(CartContext)
    console.log(cartItems)
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
  return (
    <div className='cart-icon-container'>
        <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
        <span className='item-count'>
            {/* {cartItems.reduce((acc,cv)=>{
                return acc += cv.quantity
            },0)} */}
            {cartCount}
        </span>       
    </div>
  )
}

export default CartIcon