import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        <nav>
          Header
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          { loading
            ? <Loading />
            : (
              <p data-testid="header-user-name">
                { loginName }
              </p>
            ) }
        </nav>
      </header>
    );
  }
}
