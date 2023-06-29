import { Component } from 'react';
import * as s from './Searchbar.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ReactComponent as IconSearch } from '../icons/dandruff.svg';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      Notify.failure('Enter text to search for images and photos!');
      return;
    }

    this.props.onSubmit(value.trim());
  };

  render() {
    const { value } = this.state;

    return (
      <s.Searchbar>
        <s.Form onSubmit={this.handleSubmit}>
          <button type="submit">
            <IconSearch width="25" heigth="25" />
            <s.ButtonLabel>Search</s.ButtonLabel>
          </button>

          <s.Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={value}
          />
        </s.Form>
      </s.Searchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
