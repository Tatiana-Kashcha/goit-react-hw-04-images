import { useState } from 'react';
import * as s from './Searchbar.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ReactComponent as IconSearch } from '../icons/dandruff.svg';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = evt => setValue(evt.currentTarget.value);

  const handleSubmit = evt => {
    evt.preventDefault();

    if (value.trim() === '') {
      Notify.failure('Enter text to search for images and photos!');
      return;
    }

    onSubmit(value.trim());
  };

  return (
    <s.Searchbar>
      <s.Form onSubmit={handleSubmit}>
        <button type="submit">
          <IconSearch width="25" heigth="25" />
          <s.ButtonLabel>Search</s.ButtonLabel>
        </button>

        <s.Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </s.Form>
    </s.Searchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
