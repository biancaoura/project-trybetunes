import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  }

  handleCheck = () => {
    const { trackId, trackName, previewUrl } = this.props;
    this.setState({ loading: true },
      async () => {
        await addSong({ trackId, trackName, previewUrl });
        const favoriteSongs = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoriteSongs,
        });
      });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteSongs } = this.state;

    return (
      <li>
        <section>

          <span>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>

          {
            loading
              ? <p>Carregando...</p>
              : (
                <label htmlFor="favorite">
                  <input
                    type="checkbox"
                    name="favorite"
                    id="favorite"
                    checked={ favoriteSongs.some((song) => song.trackId === trackId) }
                    onChange={ this.handleCheck }
                    data-testid={ `checkbox-music-${trackId}` }
                  />
                  Favorita
                </label>
              )
          }

        </section>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
