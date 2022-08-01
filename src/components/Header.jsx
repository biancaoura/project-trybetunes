import React, { Component } from 'react';
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
        Header
        { loading
          ? <p>Carregando...</p>
          : (
            <p data-testid="header-user-name">
              { loginName }
            </p>
          ) }
      </header>
    );
  }
}
