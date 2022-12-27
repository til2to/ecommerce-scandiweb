import React, { Component } from 'react'
import { Query } from 'react-apollo'
import ProductItem from '../../components/ProductItem/ProductItem'
import { ALLPRODUCT_QUERY } from '../../Data/GraphqlData'
import { connect } from 'react-redux';

import {
  Container,
  CategoryName,
  Wrap,
} from './ProductListElements'

class ProductList extends Component {
  
  render() {
    let { name } = this.props.match.params
    const pageSize = 12;

    return (
      <Container>
        <CategoryName>
          Category {name}
        </CategoryName>

        <Query query={ALLPRODUCT_QUERY} variables={{ title: name }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <h4> Loading.</h4>
              if (error) console.log(error.message)
              
              return <Wrap>
                {
                  data.category.products.map(prod => (
                    <ProductItem key={prod.id} prod={prod} />
                  ))
                }
              </Wrap>
            }
          }
        </Query>
      </Container>
    )
  }
}

export default connect((state) => ({ products: state.products }))(ProductList)