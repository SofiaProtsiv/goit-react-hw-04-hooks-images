import { Component } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import * as fetchImagesApi from "./services/images-api";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
import { ReactComponent as CloseBtn } from "./icons/close.svg";

export default class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    isModalOpen: false,
    largeImage: "",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchQuery } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.getImages(searchQuery, currentPage);
    }
  }

  getImages = (query, page) => {
    query === ""
      ? this.setState({
          isLoading: false,
          error: true,
        })
      : this.setState({
          isLoading: true,
        });

    fetchImagesApi
      .get(query, page)
      .then(({ data }) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        const { images } = this.state;

        images.length < 1
          ? this.setState({ error: true })
          : this.setState({ error: false });

        this.setState({
          isLoading: false,
        });

        page > 1 && this.scroll();
      });
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      largeImage: "",
    }));
  };

  handleFormSubmit = (searchQuery) => {
    searchQuery === ""
      ? this.setState({
          images: [],
          currentPage: 1,
          error: true,
        })
      : this.setState({
          images: [],
          currentPage: 1,
          searchQuery,
          error: false,
        });
  };

  handleGalleryItem = (fullImageUrl) => {
    this.setState({ largeImage: fullImageUrl, isModalOpen: true });
  };

  handleClickOnMore = () => {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage + 1,
    });
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    const { images, isLoading, isModalOpen, largeImage, error } = this.state;
    const showLoadMore = images.length > 0 && images.length >= 12;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {error === null && (
          <p className="preview">Start searching for images 👀</p>
        )}

        {isLoading && <Loader />}

        <ImageGallery images={images} openModal={this.handleGalleryItem} />

        {showLoadMore && <Button onClick={this.handleClickOnMore} />}

        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <IconButton onClick={this.toggleModal} aria-label="close modal">
              <CloseBtn width="20px" height="20px" fill="black" />
            </IconButton>
            <img src={largeImage} alt="" className="modalImage" />
          </Modal>
        )}

        {error && <ErrorMessage />}
      </>
    );
  }
}
