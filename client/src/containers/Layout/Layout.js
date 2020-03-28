import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Grid from '../../components/Grid/Grid';
import axiosConfig from '../../shared/config/axiosConfig';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  async componentDidMount() {
    const products = await axiosConfig.get('/products');
    //Add Error Boundary here
    console.log('Products...', products);

    this.setState({
      products: products.data.data,
    });
  }
  render() {
    return (
      <Auxiliary>
        <div className={classes.layout}>
          <Grid products={this.state.products} />
        </div>
      </Auxiliary>
    );
  }
}

export default Layout;
