import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
        {
          loading
            ? <Loading />
            : (
              <ul>
                {favoriteSongs.map((song) => (
                  <div key={ song.trackId }>
                    <img src={ song.artworkUrl30 } alt="capa do álbum" />
                    <MusicCard { ...song } { ...this } />
                  </div>
                ))}
              </ul>
            )
        }
      </div>
    );
  }
}
