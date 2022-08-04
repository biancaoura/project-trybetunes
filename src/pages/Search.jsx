import React, { Component } from 'react';
import Header from '../components/Header';
import Albums from '../components/Albums';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchInput: '',
    loading: false,
    artistResults: '',
    albums: [],
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      artistResults: searchInput,
    },
    async () => {
      const data = await searchAlbumsAPI(searchInput);
      this.setState({
        searchInput: '',
        loading: false,
        albums: data,
      });
    });
  }

  render() {
    const { searchInput, loading, artistResults, albums } = this.state;
    const { handleChange, handleClick } = this;
    const minLength = 2;
    const hasMinChar = searchInput.length >= minLength;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <section>
                <h4>{`Resultado de álbuns de: ${artistResults}`}</h4>
                <input
                  type="text"
                  id="searchInput"
                  name="searchInput"
                  placeholder="Buscar Banda / Artista"
                  value={ searchInput }
                  onChange={ handleChange }
                  data-testid="search-artist-input"
                />
                <button
                  type="button"
                  disabled={ !hasMinChar }
                  onClick={ handleClick }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </section>
            )
        }
        <Albums albums={ albums } />
      </div>
    );
  }
}
