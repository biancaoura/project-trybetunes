import React, { Component } from 'react';
import { func, shape } from 'prop-types';
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
      <div>
        <Header />
        { loading ? <Loading title />
          : (
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
              />
              <input
                type="text"
                name="email"
                id="email"
                className={ styles.input_info }
                placeholder="Email"
                value={ email }
                onChange={ handleChange }
              />
              <input
                type="text"
                name="description"
                id="description"
                className={ styles.input_info }
                placeholder="Description"
                value={ description }
                onChange={ handleChange }
              />
              <input
                type="text"
                name="image"
                id="image"
                className={ styles.input_info }
                placeholder="Image path"
                value={ image }
                onChange={ handleChange }
              />
              <button
                type="button"
                disabled={ !isDisabled }
                className={ styles.edit_button }
                onClick={ handleClick }
              >
                Save
              </button>
            </section>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};
