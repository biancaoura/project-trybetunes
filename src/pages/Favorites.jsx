import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from '../styles/Favorites.module.css';

export default class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: true,
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  updateFavorite = (favorites) => {
    this.setState({
      favoriteSongs: favorites,
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <div className={ styles.favorite_container }>
          <h1 className={ styles.favorite_title }>Favorite songs</h1>
          <ul>
            {favoriteSongs.map((song) => (
              <div key={ song.trackId } className={ styles.song_container }>
                <img
                  src={ song.artworkUrl100 }
                  alt="capa do álbum"
                  className={ styles.favorite_img }
                />
                <MusicCard { ...song } { ...this } />
              </div>
            ))}
          </ul>
        </div>
        { loading && <Loading /> }
      </div>
    );
  }
}
