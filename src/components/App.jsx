import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImagesApi, PER_PAGE } from 'api/getImagesApi';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getImages();
  }, [searchText, currentPage]);

  // useEffect((useCallback()
  //    => getImages()) {
  //     setIsLoading(true);
  //   },
  //   [searchText, currentPage]
  // );

  // componentDidUpdate(_, prevState) {
  //   const { searchText, currentPage } = this.state;

  //   if (
  //     prevState.searchText !== searchText ||
  //     prevState.currentPage !== currentPage
  //   ) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     this.getImages();
  //   }
  // }

  const getImages = async () => {
    try {
      const dataGallery = await getImagesApi(searchText, currentPage);

      if (dataGallery.data.hits.length && currentPage === 1) {
        Notify.success(`We found ${dataGallery.data.totalHits} images.`);
      }

      if (!dataGallery.data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      setData(prevState => [...prevState, ...dataGallery.data.hits]);
      setTotalPage(Math.ceil(dataGallery.data.totalHits / PER_PAGE));
    } catch (error) {
      setError({ error });
      // this.setState({ error });
      console.log('ERROR', error);
      Notify.failure('Oops, something went wrong! Try again later.');
    } finally {
      setIsLoading(false);
      Loading.remove();
    }
  };

  const handleSearch = searchText => {
    setSearchText(searchText);
    setCurrentPage(1);
    setData([]);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const showModal = (currentImage, tags) => {
    setIsShowModal(true);
    setCurrentImage(currentImage);
    setTags(tags);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {isLoading && Loading.arrows()}
      {totalPage > 0 && <ImageGallery data={data} showModal={showModal} />}
      {totalPage > currentPage && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {isShowModal && (
        <Modal
          currentImage={currentImage}
          tags={tags}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
export default App;
