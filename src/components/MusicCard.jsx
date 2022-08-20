import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import styles from '../styles/MusicCard.module.css';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  handleCheck = (e) => {
    const { trackId, trackName, previewUrl, artworkUrl100, updateFavorite } = this.props;
    this.setState({ loading: true },
      async () => {
        if (e.target.checked) {
          await addSong({ trackId, trackName, previewUrl, artworkUrl100 });
        } else {
          await removeSong({ trackId, trackName, previewUrl, artworkUrl100 });
          if (updateFavorite) {
            const favoriteSongs = await getFavoriteSongs();
            updateFavorite(favoriteSongs);
          }
        }
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
      <section className={ styles.song_info }>

        <span className={ styles.song_name }>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {
          loading
            ? <Loading />
            : (
              <label htmlFor="favorite" className={ styles.label }>
                <input
                  type="checkbox"
                  name="favorite"
                  id="favorite"
                  className={ styles.favorite_checkbox }
                  checked={ favoriteSongs.some((song) => song.trackId === trackId) }
                  onChange={ this.handleCheck }
                  data-testid={ `checkbox-music-${trackId}` }
                />
                Favorite
              </label>
            )
        }
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  artworkUrl100: PropTypes.string,
  updateFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  artworkUrl100: 'url',
  updateFavorite: () => {},
};
