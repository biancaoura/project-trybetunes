import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import styles from '../styles/ProfileEdit.module.css';

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
        <section className={ styles.edit_container }>
          <h1 className={ styles.edit_title }>Edit profile</h1>
          <input
            type="text"
            name="name"
            id="name"
            className={ styles.input_info }
            placeholder="Name"
            value={ name }
            onChange={ handleChange }
            data-testid="edit-input-name"
          />
          <input
            type="text"
            name="email"
            id="email"
            className={ styles.input_info }
            placeholder="Email"
            value={ email }
            onChange={ handleChange }
            data-testid="edit-input-email"
          />
          <input
            type="text"
            name="description"
            id="description"
            className={ styles.input_info }
            placeholder="Description"
            value={ description }
            onChange={ handleChange }
            data-testid="edit-input-description"
          />
          <input
            type="text"
            name="image"
            id="image"
            className={ styles.input_info }
            placeholder="Image path"
            value={ image }
            onChange={ handleChange }
            data-testid="edit-input-image"
          />
          <button
            type="button"
            disabled={ !isDisabled }
            className={ styles.edit_button }
            onClick={ handleClick }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </section>
        { loading && <Loading /> }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
