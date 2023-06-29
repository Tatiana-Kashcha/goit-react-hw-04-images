import PropTypes from 'prop-types';
import * as s from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <s.DivButton>
      <s.Button type="button" onClick={onLoadMore}>
        Load more
      </s.Button>
    </s.DivButton>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
