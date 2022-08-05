import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        { title ? <h4>Loading... </h4> : <p>Loading...</p>}
      </div>
    );
  }
}

Loading.propTypes = {
  title: PropTypes.bool,
};

Loading.defaultProps = {
  title: false,
};
