import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
    const { collectionName, artistName } = allSongs[0] || {};
    console.log(allSongs);

    return (
      <div data-testid="page-album">
        <Header />

        <section>
          <h4 data-testid="album-name">{collectionName}</h4>
          <p data-testid="artist-name">{artistName}</p>
        </section>

        <ul>
          {
            loading
              ? <h2>Carregando...</h2>
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
