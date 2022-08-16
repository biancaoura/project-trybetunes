import { arrayOf, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Albums.module.css';

export default class Albums extends Component {
  render() {
    const { albums, artist } = this.props;

    if (albums.length < 1) return <p>No results found</p>;
    return (
      <section>
        <h3>{`Album results for: ${artist}`}</h3>
        <ul>
          {
            albums.map(({
              artistName,
              collectionName,
              collectionId,
              artworkUrl100,
            }) => (
              <li key={ collectionId }>
                <img src={ artworkUrl100 } alt={ `${collectionName} cover` } />
                <h4>{collectionName}</h4>
                <p>{artistName}</p>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  More info
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}

Albums.propTypes = {
  albums: arrayOf(shape({
    artistName: string,
    collectionName: string,
  })).isRequired,
  artist: string.isRequired,
};
