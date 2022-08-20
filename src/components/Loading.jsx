import React, { Component } from 'react';
import { bool } from 'prop-types';
import styles from '../styles/Components.module.css';

export default class Loading extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        { title
          ? (
            <h4 className={ styles.loading_heading }>
              Loading...
            </h4>
          )
          : <p className={ styles.loading_para }>Loading...</p> }
      </div>
    );
  }
}

Loading.propTypes = {
  title: bool,
};

Loading.defaultProps = {
  title: false,
};
