import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

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

        <section>
          <h4 data-testid="album-name">{collectionName}</h4>
          <p data-testid="artist-name">{artistName}</p>
          <img src={ artworkUrl100 } alt="capa do álbum" />
        </section>

        <ul>
          {
            loading
              ? <Loading title />
              : (
                allSongs
                  .slice(1)
                  .map((song) => (
                    <MusicCard key={ song.trackId } { ...song } />
                  ))

              )
          }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: objectOf(PropTypes.string),
  }).isRequired,
};
