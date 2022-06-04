import React, { Fragment, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import './Cart.scss'

// Utils

import { STORAGE_PRODUCTS_CART, BASE_PATH } from '../../utils/Constants'
import { countDuplicatesItemsArray, removeArrayDuplicates, removeItemArray } from '../../utils/arrayFunc'

// Iconos

import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg'
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg'
import { ReactComponent as Close } from '../../assets/svg/close.svg'
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg'

export default function Cart(props) {
    const { productsCart, getProductsCart, products } = props

    const [ cartOpen, setCartOpen ] = useState(false)

    const [ singelProductsCart, setSingelProductsCart ] = useState([])

    const [ cartTotalPrice, setCartTotalPrice ] = useState(0)

    // Condición Ternaria si nuestro carrito es True le asignameros 400px al carrito, si no 0
    const widthCartContent = cartOpen ? 400 : 0

    useEffect(() => {
      // Eliminamos Ids duplicados del carrito
      const allProductsId = removeArrayDuplicates(productsCart)

      // Guardamos en el estado singelProducts
      setSingelProductsCart(allProductsId)
    }, [productsCart]) // Actualice cada vez que productsCart se modifique
    
    useEffect(() => {
      const productData = [] // Array vacio
      let totalPrice = 0 // Variable que almacenará el precio 

      const allProductsId = removeArrayDuplicates(productsCart) // Obtener los productos únicos del carrito sin duplicar Ids

      allProductsId.forEach(productId => {
          const quantity = countDuplicatesItemsArray(productId, productsCart) // Obtener la cantidad de veces que se remite el Item
          const productValue = {
              id: productId,
              quantity: quantity
          } // Objeto con id y cantidad total por item
          productData.push(productValue)
      })

      if (!products.loading && products.result) { // Si ya cargaron los productos del API y tienen contenido
          products.result.forEach(product => { // Recorra dichos productos
            productData.forEach(item => { // Y del array productData que contiene el item y su cantidad total
              if (product.id == item.id) { // Compare si existe el product del API con el array ProductData
                  const totalValue = product.price * item.quantity // Si existe multiplique su precio por la cantidad que trae desde productData
                  totalPrice = totalPrice + totalValue // Sumar al precio total el precio del (Artículo por sus cantidades)
              }  
            })
          })
      }
      setCartTotalPrice(totalPrice)
    }, [productsCart, products])
    

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART)
        getProductsCart()
    }

    const increaseQuantity = (id) => {
        const arrayItemsCar = productsCart // Obtenemos todos los ids actuales del carrito
        arrayItemsCar.push(id) // Añadimos al array
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCar) // Almacenamos en LocalStorage
        getProductsCart()
    }

    const decreaseQuantity = (id) => {
        const arrayItemsCar = productsCart // Obtenemos todos los ids actuales del carrito
        const result = removeItemArray(arrayItemsCar, id.toString()) // Eliminamos elemento del Array con la función declarada en Utils
        localStorage.setItem(STORAGE_PRODUCTS_CART, result) // Almacenamos en LocalStorage
        getProductsCart()
    }

    const openCart = () => {
        setCartOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeCart = () => {
        setCartOpen(false)
        document.body.style.overflow = 'scroll'
    }

    return (
        <Fragment>
            <Button
                variant='link'
                className='cart'
            >
                { productsCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
            </Button>
            <div className='cart-content' style={{ width: widthCartContent }}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
                <div className='cart-content__products'>
                    { singelProductsCart.map((idProductsCart, index) => (
                        <CartContentProducts 
                            products={products} 
                            key={index} 
                            idsProductsCart={productsCart} // Ids almacenados en el carrito actualmente
                            idProductCart={idProductsCart} // Id actual del elemento carrito (Obtenido del bucle)
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                    ))}
                </div>
                <CartContentFooter cartTotalPrice={cartTotalPrice} />
            </div>
        </Fragment>
    )
}

function CartContentHeader(props) {
    const { closeCart, emptyCart } = props

    return (
        <div className='cart-content__header'>
            <div>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>
            <Button
                variant='link'
                onClick={emptyCart}
            >
                Vaciar
                <Garbage />
            </Button>
        </div>
    )
}

function CartContentProducts(props) {
    const { products: { loading, result }, idsProductsCart, idProductCart, increaseQuantity, decreaseQuantity } = props

    if (!loading || result) {
        return result.map((product, index) => {
            if (idProductCart == product.id) {
                const quantity = countDuplicatesItemsArray(product.id, idsProductsCart) // Contar cantidad de veces que se repite el Id
                return (
                    <RenderProduct
                        key={index}
                        product={product}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                )
            }
        })
    }
    // Si no entra al if
    return null
}

function RenderProduct(props) {
    const { product, quantity, increaseQuantity, decreaseQuantity } = props

    return (
        <div className='cart-content__product'>
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.name.substr(0, 25)}</h3>
                    <p>$ {product.price.toLocaleString()} Unidad</p>
                </div>
                <div>
                    <p>En carro: {quantity} Unidades</p>
                    <div>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CartContentFooter(props) {
    const { cartTotalPrice } = props

    return (
        <div className='cart-content__footer'>
            <div>
                <p>Total aproximado: </p>
                <p>$ { cartTotalPrice.toLocaleString() } Pesos</p>
            </div>
            <Button>Tramitar Pedido</Button>
        </div>
    )
}
