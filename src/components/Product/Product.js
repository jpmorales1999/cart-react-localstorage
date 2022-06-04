import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { BASE_PATH } from '../../utils/Constants'

import './Product.scss'

export default function Product(props) {
  const { product, addProductCart } = props

  return (
    <div className='product'>
        <Card>
            <Card.Img 
                variant='top'
                src={`${BASE_PATH}/${product.image}`}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.extraInfo}</Card.Text>
                <Card.Text>$ {product.price.toLocaleString()} Unidad</Card.Text>
                <Button onClick={() => addProductCart(product.id, product.name)}>
                    Añadir al carrito
                </Button>
            </Card.Body>
        </Card>
    </div>
  )
}
