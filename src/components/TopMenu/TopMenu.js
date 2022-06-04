import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

// Components
import Cart from '../Cart'

// Logo
import Logo from '../../assets/img/logo.png'

import './TopMenu.scss'

export default function TopMenu(props) {
  const { productsCart, getProductsCart, products } = props
  return (
    <Navbar
        bg='dark'
        variant='dark'
        className='top-menu'
    >
        <Container>
            <BranvNav />

            {/* Carrito */}
            <Cart productsCart={productsCart} getProductsCart={getProductsCart} products={products} />
        </Container>
    </Navbar>
  )
}

function BranvNav() {
    return (
        <Navbar.Brand>
            <img src={Logo} alt="Logo App" className='top-menu__logo' />
            <h2>La casa de las camisetas</h2>
        </Navbar.Brand>
    )
} 
