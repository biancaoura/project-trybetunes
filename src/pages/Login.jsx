import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loginName: '',
    loading: false,
  }

  handleChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  logginIn = () => {
    const { loginName } = this.state;
    this.setState({ loading: true },
      async () => {
        await createUser({ name: loginName });
        const { history: { push } } = this.props;
        push('/search');
      });
  };

  render() {
    const { loginName, loading } = this.state;
    const { handleChange, logginIn } = this;

    const minCharacters = 3;
    const hasMinChar = loginName.length < minCharacters;

    return (
      <div data-testid="page-login">
        {
          loading === true ? <h1>Carregando...</h1> : (
            <div>

              <h1>Login</h1>

              <input
                type="text"
                id="loginName"
                name="loginName"
                minLength="3"
                placeholder="Nome"
                value={ loginName }
                onChange={ (e) => handleChange(e) }
                data-testid="login-name-input"
              />

              <button
                type="button"
                disabled={ hasMinChar }
                data-testid="login-submit-button"
                onClick={ logginIn }
              >
                Entrar
              </button>
            </div>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
