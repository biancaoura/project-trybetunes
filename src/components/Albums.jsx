import { arrayOf, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Albums.module.css';

export default class Albums extends Component {
  render() {
    const { albums, artist } = this.props;

    if (albums.length < 1) return <p>No results found</p>;
    return (
      <section className={ styles.outer_container }>
        <h3 className={ styles.h3 }>{`Album results for: ${artist}`}</h3>
        <ul className={ styles.cards_container }>
          {
            albums.map(({
              artistName,
              collectionName,
              collectionId,
              artworkUrl100,
            }) => (
              <li key={ collectionId } className={ styles.card }>
                <Link
                  to={ `/album/${collectionId}` }
                  className={ styles.link }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img
                    src={ artworkUrl100 }
                    alt={ `${collectionName} cover` }
                    className={ styles.img }
                  />
                  <h4 className={ styles.h4 }>{collectionName}</h4>
                  <p className={ styles.p }>{artistName}</p>
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
