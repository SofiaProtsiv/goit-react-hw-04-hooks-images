import style from "./imageGalleryItem.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({ image, openModal }) {
  const fullImage = () => openModal(image.largeImageURL);
  return (
    <li id={image.id} className={style.item}>
      <img
        className={style.image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={fullImage}
      />
    </li>
  );
}
ImageGalleryItem.defaultProps = {
  tags: "",
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  openModal: PropTypes.func.isRequired,
};
