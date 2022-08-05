import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Sidebar extends Component {
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
      <Menu>
        { loading
          ? <Loading />
          : (
            <p className="username" data-testid="header-user-name">
              { loginName }
            </p>
          ) }

        <Link to="/search" data-testid="link-to-search">
          <div className="icon-container bm-item">
            <FontAwesomeIcon icon={ faMagnifyingGlass } />
            Search
          </div>
        </Link>

        <Link to="/favorites" data-testid="link-to-favorites">
          <div className="icon-container bm-item">
            <FontAwesomeIcon icon={ faStar } />
            Favorites
          </div>
        </Link>

        <Link to="/profile" data-testid="link-to-profile">
          <div className="icon-container bm-item">
            <FontAwesomeIcon icon={ faUser } />
            Profile
          </div>
        </Link>
      </Menu>
    );
  }
}
