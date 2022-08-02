import PropTypes, { string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Albums extends Component {
  render() {
    const { albums } = this.props;
    return (
      <section>
        <ul>
          {
            albums.length < 1
              ? <p>Nenhum álbum foi encontrado</p>
              : albums.map(({
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
                    Mais detalhes
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
  albums: PropTypes.arrayOf(PropTypes.shape({
    artistName: string,
    collectionName: string,
  })).isRequired,
};
