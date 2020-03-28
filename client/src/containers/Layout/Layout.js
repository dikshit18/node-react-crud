import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Grid from '../../components/Grid/Grid';
import axiosConfig from '../../shared/config/axiosConfig';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const products = await axiosConfig.get('/products');
    console.log('products...', products);
  }
  render() {
    return (
      <Auxiliary>
        <div className={classes.layout}>
          <Grid />
        </div>
      </Auxiliary>
    );
  }
}

export default Layout;
