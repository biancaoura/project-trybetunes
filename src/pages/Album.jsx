import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import styles from '../styles/Album.module.css';

export default class Album extends Component {
  state = {
    allSongs: [],
    loading: true,
  }

  async componentDidMount() {
    const {
      match: {
        params: {
          id,
        } } } = this.props;

    const data = await getMusics(id);
    this.setState({
      allSongs: data,
      loading: false,
    });
  }

  render() {
    const { allSongs, loading } = this.state;
    const { collectionName, artistName, artworkUrl100 } = allSongs[0] || {};
    return (
      <div data-testid="page-album">
        <Header />

        <div className={ styles.album_info }>
          <section className={ styles.album_header }>
            <h3
              className={ styles.album_title }
              data-testid="album-name"
            >
              {collectionName}
            </h3>
            <h4
              className={ styles.artist_name }
              data-testid="artist-name"
            >
              {artistName}
            </h4>
            <img src={ artworkUrl100 } alt="capa do álbum" />
          </section>
          <ul>
            {
              allSongs
                .slice(1)
                .map((song) => (
                  <MusicCard key={ song.trackId } { ...song } />
                ))
            }
            { loading && <Loading title /> }
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: objectOf(PropTypes.string),
  }).isRequired,
};
