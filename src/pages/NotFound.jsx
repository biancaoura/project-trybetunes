import React, { Component } from 'react';
import styles from '../styles/Components.module.css';

export default class NotFound extends Component {
  render() {
    return (
      <h4 className={ styles.not_found }>404 Not Found</h4>
    );
  }
}
