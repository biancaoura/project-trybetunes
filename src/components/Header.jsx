import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import styles from '../styles/Header.module.css';

export default class Header extends Component {
  state = {
    loginName: '',
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true },
      async () => {
        const username = await getUser();
        this.setState({
          loginName: username.name,
          loading: false,
        });
      });
  }

  render() {
    const { loginName, loading } = this.state;

    return (
      <header className={ styles.header } data-testid="header-component">
        <nav className={ styles.nav }>
          <Link to="/favorites" data-testid="link-to-favorites">
            <div className={ styles.icon_container }>
              <FontAwesomeIcon icon={ faStar } />
              Favorites
            </div>
          </Link>
          <Link to="/search" data-testid="link-to-search">
            <div className={ styles.icon_container }>
              <FontAwesomeIcon icon={ faMagnifyingGlass } />
              Search
            </div>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <div className={ styles.icon_container }>
              <FontAwesomeIcon icon={ faUser } />
              Profile
            </div>
          </Link>
          { loading
            ? <Loading />
            : (
              <p className={ styles.username } data-testid="header-user-name">
                { loginName }
              </p>
            ) }
        </nav>
      </header>
    );
  }
}
