import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";
import style from "./imageGallery.module.css";

const ImageGallery = ({ images, openModal }) => (
  <ul className={style.imageGallery}>
    {images.map((image) => {
      return (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      );
    })}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
export default ImageGallery;
