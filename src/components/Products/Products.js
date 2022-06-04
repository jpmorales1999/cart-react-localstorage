import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './Products.scss'

// Components

import Loading from '../Loading'
import Product from '../Product'

export default function Products(props) {
  const { 
      products: { result, loading },
      addProductCart 
  } = props

  return (
    <Container>
        <Row>
            { loading || !result ? (
                <Loading />
            ) : (
                result.map((product, index) => (
                    <Col key={index} xs={6} md={4} xl={3}>
                        <Product product={product} addProductCart={addProductCart} />
                    </Col>
                ))
            )}
        </Row>
    </Container>
  )
}
