import { createContext,useEffect,useState } from "react";


const addCartItem = (cartItems,productToAdd) => {

    const existingCartItems = cartItems.find( (cartItem) => cartItem.id === productToAdd.id )

    if(existingCartItems){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity+1 } :
            cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity : 1}]
}


const removeCartItem = (cartItems,cartItemToRemove) => {

    const existingCartItems = cartItems.find( (cartItem) => cartItem.id === cartItemToRemove.id )

    if(existingCartItems.quantity === 1){
       return cartItems.filter((cartItem)=> (
             cartItem.id !== cartItemToRemove.id
        ))
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity-1 } :
    cartItem
)
}

const clearCartItem = (cartItems,cartItemToClear) => {
    return cartItems.filter((cartItem)=> (
        cartItem.id !== cartItemToClear.id
   ))
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () =>{} ,
    cartItems: [],
    addItemToCart : () => {},
    removeItemFromCart : () => {},
    clearItemFromCart: ()=>{},
    cartCount:0,
    carTotal:0
})

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false)
    const [cartItems,setCartItems] = useState([])
    const [cartCount,setCartCount] = useState(0)
    const [cartTotal,setCartTotal] = useState(0)


    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> 
            total += cartItem.quantity
       , 0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> 
            total += cartItem.quantity*cartItem.price
       , 0)
        setCartTotal(newCartCount)
    },[cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    } 

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove))
    } 

    const clearItemFromCart = (cartItemToClear) => {
        setCartTotal(clearCartItem(cartItems,cartItemToClear))
    } 

    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,removeItemFromCart,clearItemFromCart,cartTotal}
    return (
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    )
}