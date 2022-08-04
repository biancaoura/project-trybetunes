import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: true,
  }

  async componentDidMount() {
    const userInfo = await getUser();

    Object.entries(userInfo).forEach(([key, value]) => {
      this.setState({
        [key]: value,
        loading: false,
      });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    const userInfo = { name, email, description, image };

    this.setState({ loading: true },
      async () => {
        await updateUser(userInfo);

        const { history: { push } } = this.props;
        push('/profile');
      });
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    const { handleChange, handleClick } = this;

    const isEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
    const isDisabled = name && email && description && image && isEmail;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading
            ? <h4>Carregando...</h4>
            : (
              <section>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                  onChange={ handleChange }
                  data-testid="edit-input-name"
                />
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ handleChange }
                  data-testid="edit-input-email"
                />
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={ description }
                  onChange={ handleChange }
                  data-testid="edit-input-description"
                />
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  onChange={ handleChange }
                  data-testid="edit-input-image"
                />
                <button
                  type="button"
                  disabled={ !isDisabled }
                  onClick={ handleClick }
                  data-testid="edit-button-save"
                >
                  Salvar
                </button>
              </section>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
