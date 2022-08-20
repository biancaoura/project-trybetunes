import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import styles from '../styles/Header.module.css';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Sidebar extends Component {
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

  getMenu = () => {
    const { loginName, loading } = this.state;
    return (
      <Menu
        bodyClassName={ styles.body }
        htmlClassName={ styles.html }
        pageWrapId="page-wrap"
        burgerButtonClassName={ styles.burger_button }
        burgerBarClassName={ cx(styles.burger_bars, styles.burger_bars_hover) }
        crossButtonClassName={ styles.cross_button }
        crossClassName={ styles.cross }
        menuClassName={ cx(styles.menu_wrap, styles.menu) }
        itemListClassName={ styles.item_list }
        itemClassName={ styles.item }
        overlayClassName={ styles.overlay }
        width="220px"
      >
        { loading ? <Loading />
          : (

            <p className={ styles.username }>
              { loginName }
            </p>
          )}

        <Link to="/search">
          <div className={ cx(styles.icon_container, styles.item) }>
            <FontAwesomeIcon icon={ faMagnifyingGlass } />
            Search
          </div>
        </Link>

        <Link to="/favorites">
          <div className={ cx(styles.icon_container, styles.item) }>
            <FontAwesomeIcon icon={ faStar } />
            Favorites
          </div>
        </Link>

        <Link to="/profile">
          <div className={ cx(styles.icon_container, styles.item) }>
            <FontAwesomeIcon icon={ faUser } />
            Profile
          </div>
        </Link>

      </Menu>
    );
  }

  render() {
    return (
      <div id="outer-menu-container">
        {this.getMenu()}
      </div>
    );
  }
}
