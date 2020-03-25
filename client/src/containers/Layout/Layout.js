import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import LeftGrid from '../../components/LeftGrid/Leftgrid';

class Layout extends Component {
  render() {
    return (
      <Auxiliary>
        <div className={classes.layout}>
          <LeftGrid />
          {/* <TableGrid /> */}
        </div>
      </Auxiliary>
    );
  }
}

export default Layout;
