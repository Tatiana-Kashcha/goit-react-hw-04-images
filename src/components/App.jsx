import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImagesApi, PER_PAGE } from 'api/getImagesApi';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    searchText: '',
    data: [],
    currentPage: 1,
    totalPage: 0,
    error: null,
    isShowModal: false,
    isLoading: false,
    currentImage: null,
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchText, currentPage } = this.state;

    if (
      prevState.searchText !== searchText ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({
        isLoading: true,
      });
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchText, currentPage } = this.state;

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
      this.setState(prevState => ({
        data: [...prevState.data, ...dataGallery.data.hits],
        totalPage: Math.ceil(dataGallery.data.totalHits / PER_PAGE),
      }));
    } catch (error) {
      this.setState({ error });
      console.log('ERROR', error);
      Notify.failure('Oops, something went wrong! Try again later.');
    } finally {
      this.setState({ isLoading: false });
      Loading.remove();
    }
  };

  handleSearch = searchText => {
    this.setState({ searchText, currentPage: 1, data: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  showModal = (currentImage, tags) => {
    this.setState({
      isShowModal: true,
      currentImage: currentImage,
      tags: tags,
    });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const {
      data,
      isLoading,
      currentPage,
      totalPage,
      isShowModal,
      currentImage,
      tags,
    } = this.state;
    console.log(this.state); //для контроля

    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading && Loading.arrows()}
        {totalPage > 0 && (
          <ImageGallery data={data} showModal={this.showModal} />
        )}
        {totalPage > currentPage && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {isShowModal && (
          <Modal
            currentImage={currentImage}
            tags={tags}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
