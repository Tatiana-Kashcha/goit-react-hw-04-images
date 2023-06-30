import { useEffect } from 'react';
import { ReactComponent as IconClose } from '../icons/x-close.svg';
import * as s from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({ closeModal, currentImage, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return (
    <s.Overlay onClick={handleBackdropClick}>
      <s.Modal>
        <s.CloseButton type="button" onClick={closeModal}>
          <IconClose width="30" heigth="30" />
          <s.ButtonLabel>Close</s.ButtonLabel>
        </s.CloseButton>
        <img src={currentImage} alt={tags} />
      </s.Modal>
    </s.Overlay>
  );
}

Modal.propTypes = {
  currentImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
