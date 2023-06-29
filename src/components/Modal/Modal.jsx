import { Component } from 'react';
import { ReactComponent as IconClose } from '../icons/x-close.svg';
import * as s from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <s.Overlay onClick={this.handleBackdropClick}>
        <s.Modal>
          <s.CloseButton type="button" onClick={this.props.closeModal}>
            <IconClose width="30" heigth="30" />
            <s.ButtonLabel>Close</s.ButtonLabel>
          </s.CloseButton>
          <img src={this.props.currentImage} alt={this.props.tags} />
        </s.Modal>
      </s.Overlay>
    );
  }
}

Modal.propTypes = {
  currentImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
