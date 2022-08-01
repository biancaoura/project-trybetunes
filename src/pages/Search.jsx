import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchInput: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { searchInput } = this.state;
    const { handleChange } = this;

    const minLength = 2;
    const hasMinChar = searchInput.length >= minLength;

    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            placeholder="Banda / Artista"
            value={ searchInput }
            onChange={ handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ !hasMinChar }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </section>
        Search
      </div>
    );
  }
}
