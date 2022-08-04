import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

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
          loading === true ? <Loading title /> : (
            <main className="flex-column round-border">

              <header>
                <h1>Welcome back!</h1>
                <h4>Login</h4>
              </header>

              <div className="input-container flex-column">
                <div>
                  <label htmlFor="loginName" className="name-container flex-column">
                    <div>Name</div>
                    <input
                      type="text"
                      id="loginName"
                      name="loginName"
                      minLength="3"
                      placeholder="Your name"
                      value={ loginName }
                      onChange={ (e) => handleChange(e) }
                      data-testid="login-name-input"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="round-border"
                  disabled={ hasMinChar }
                  data-testid="login-submit-button"
                  onClick={ logginIn }
                >
                  Entrar
                </button>
              </div>
            </main>
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
