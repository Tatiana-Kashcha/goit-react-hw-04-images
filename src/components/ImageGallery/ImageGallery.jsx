import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import * as s from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ data, showModal }) => {
  return (
    <s.List>
      {data.map(({ id, largeImageURL, tags, webformatURL }) => (
        <s.ListItems
          key={id}
          onClick={() => {
            showModal(largeImageURL, tags);
          }}
        >
          <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
        </s.ListItems>
      ))}
    </s.List>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};
