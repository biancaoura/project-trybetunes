import React, { Component } from 'react';
import Header from '../components/Header';
import Albums from '../components/Albums';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from '../styles/Search.module.css';

export default class Search extends Component {
  state = {
    searchInput: '',
    loading: false,
    artistResults: '',
    albums: [],
    albumFound: false,
  }

  componentDidMount() {
    document.body.className = `${styles.body}`;
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
      albumFound: true,
    },
    async () => {
      const data = await searchAlbumsAPI(searchInput);
      console.log(data);
      this.setState({
        searchInput: '',
        loading: false,
        albums: data,
      });
    });
  }

  render() {
    const { searchInput, loading, artistResults, albums, albumFound } = this.state;
    const { handleChange, handleClick } = this;
    const minLength = 2;
    const hasMinChar = searchInput.length >= minLength;

    return (
      <div className={ styles.content_wrapper }>
        <Header />
        <main className={ styles.main_container }>

          <section className={ styles.input_container }>
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              placeholder="Search albums by artist / band name"
              value={ searchInput }
              onChange={ handleChange }
              className={ styles.input }
            />
            <button
              type="button"
              disabled={ !hasMinChar }
              onClick={ handleClick }
              className={ styles.button }
            >
              Search
            </button>
          </section>
          { loading && <Loading /> }
          {albumFound && <Albums albums={ albums } artist={ artistResults } />}

        </main>
      </div>
    );
  }
}
