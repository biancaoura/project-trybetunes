import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import cx from 'classnames';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import styles from '../styles/Login.module.css';

export default class Login extends Component {
  state = {
    loginName: '',
    loading: false,
  }

  componentDidMount() {
    document.body.className = `${styles.login_body}`;
  }

  componentWillUnmount() {
    document.body.style.display = 'block';
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

  handleChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loginName, loading } = this.state;
    const { handleChange, logginIn } = this;

    const minCharacters = 3;
    const hasMinChar = loginName.length < minCharacters;

    return (
      <div>
        { loading ? <Loading title />
          : (
            <main className={ cx(styles.flex_column, styles.round_border, styles.main) }>

              <header className={ styles.header }>
                <h1>Welcome back!</h1>
                <h4>Login</h4>
              </header>

              <div className={ styles.flex_column }>
                <label
                  htmlFor="loginName"
                  className={ cx(styles.name_container, styles.flex_column) }
                >
                  <div>Name</div>
                  <input
                    type="text"
                    id="loginName"
                    className={ styles.input }
                    name="loginName"
                    minLength="3"
                    placeholder="Your name"
                    value={ loginName }
                    onChange={ (e) => handleChange(e) }
                  />
                </label>
                <button
                  type="button"
                  className={ cx(styles.round_border, styles.button) }
                  disabled={ hasMinChar }
                  onClick={ logginIn }
                >
                  Login
                </button>
              </div>
            </main>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};
