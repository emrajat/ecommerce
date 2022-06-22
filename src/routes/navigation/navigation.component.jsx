import { useContext } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
// import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import { NavigationContainer, LinkContainer,NavLinks ,NavLinke } from './navigation.styles';


const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)
    // console.log(currentUser)
    const signOutHandler = async() => {
       await signOutUser()
    }
    return (
    <>
    <NavigationContainer>
        <LinkContainer to= '/'>
            <CrwnLogo className='logo' />
        </LinkContainer>
        <NavLinks>
            <NavLinke to='/shop'>
                SHOP
            </NavLinke>
            {currentUser ? 
                <NavLinke as='span' onClick={signOutHandler} >
                     Sign Out
                </NavLinke> : 
                <NavLinke  to='/auth'>
                     Sign In
                 </NavLinke>
            }

            <CartIcon />
            
        </NavLinks>
        {isCartOpen &&
            <CartDropdown />
        }
    </NavigationContainer>  
    <Outlet/>
    </>
    )
  }

  export default Navigation