import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Button from "./components/Button";

import fetchDataApi from "./services/images-api";

import IconButton from "./components/IconButton";
import { ReactComponent as CloseBtn } from "./icons/close.svg";

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      getImages();
    }
  }, [searchQuery]);

  const getImages = () => {
    setIsLoading(true);

    fetchDataApi(searchQuery, currentPage)
      .then(({ hits }) => {
        console.log(hits);
        setImages((prevImages) => [...prevImages, ...hits]);
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        if (currentPage > 1) {
          scroll();
        }
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const toggleModal = () => {
    setIsModalOpen((prevModal) => !prevModal);
  };

  const handleFormSubmit = (searchQuery) => {
    setImages([]);
    setCurrentPage(1);
    setSearchQuery(searchQuery);
    setIsLoading(false);
    setIsModalOpen(false);
    setLargeImage("");
    setError(false);

    if (searchQuery === "" || images === []) {
      setError(true);
    }
  };

  const handleGalleryItem = (fullImageUrl) => {
    setLargeImage(fullImageUrl);
    setIsModalOpen(true);
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const showLoadMore = images.length > 0 && images.length >= 12;
  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />

      {error === null && (
        <p className="preview">Start searching for images 👀</p>
      )}

      {isLoading && <Loader />}

      <ImageGallery images={images} openModal={handleGalleryItem} />

      {showLoadMore && <Button onLoadMore={getImages} />}

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <IconButton onClick={toggleModal} aria-label="close modal">
            <CloseBtn width="20px" height="20px" fill="black" />
          </IconButton>
          <img src={largeImage} alt="" className="modalImage" />
        </Modal>
      )}

      {error && <ErrorMessage />}
    </>
  );
}
