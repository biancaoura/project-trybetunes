import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
        {
          loading
            ? <Loading title />
            : (
              <section>
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{description}</p>
                <img src={ image } alt="imagem de perfil" data-testid="profile-image" />
                <Link to="/profile/edit">Editar perfil</Link>
              </section>
            )
        }
      </div>
    );
  }
}
