import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

// Hook
import useFetch from './hooks/useFetch'

// Components
import TopMenu from "./components/TopMenu"
import Products from "./components/Products"

// Utils
import { urlApiProducts, STORAGE_PRODUCTS_CART } from './utils/Constants'

function App() {
  const products = useFetch(urlApiProducts, null)

  const [ productsCart, setProductsCart ] = useState([])

  useEffect(() => {
    getProductsCart()  
  }, [])
  
  // Recuperar Carrito
  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART)

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(',') // Convertir el string del Storage en un Array
      setProductsCart(idsProductsSplit) // Agregamos al estado productsCart
    } else {
      setProductsCart([])
    }
  }

  const addProductCart = (id, name) => {
    const idsProducts = productsCart // Obtenemos todos los id presentes actualmente en el carrito
    idsProducts.push(id) // Guardamos el nuevo id
    setProductsCart(idsProducts) // Actualizamos el carrito
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart) // Guardamos en el Local Storage los Ids del Carrito
    getProductsCart()
    toast.success(`${name} añadido al carrito correctamente.`)
  }

  return (
    <div>
      <TopMenu productsCart={productsCart} getProductsCart={getProductsCart} products={products} />
      <Products products={products} addProductCart={addProductCart} />
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='colored'
      />
    </div>
  );
}

export default App;
