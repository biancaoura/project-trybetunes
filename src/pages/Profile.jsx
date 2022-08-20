import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import styles from '../styles/Profile.module.css';

export default class Profile extends Component {
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

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section className={ styles.profile_container }>
          <h1 className={ styles.profile_title }>Profile overview</h1>
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{description}</p>
          <img
            src={ image }
            alt="profile pic"
            data-testid="profile-image"
            className={ styles.profile_img }
          />
          <Link to="/profile/edit" className={ styles.edit_button }>Edit profile</Link>
        </section>
        { loading && <Loading title /> }
      </div>
    );
  }
}
