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
      <div>
        <Header />
        { loading ? <Loading title />
          : (
            <section className={ styles.profile_container }>
              <h1 className={ styles.profile_title }>Profile overview</h1>
              <img
                src={ image }
                alt=""
                className={ styles.profile_img }
              />
              <h3>{name}</h3>
              <p>{email}</p>
              <p>{description}</p>
              <Link
                to="/profile/edit"
                className={ styles.edit_button }
              >
                Edit profile

              </Link>
            </section>
          )}
      </div>
    );
  }
}
