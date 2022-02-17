import PropTypes from "prop-types";
import style from "./button.module.css";

const Button = ({ onLoadMore }) => (
  <button type="button" className={style.button} onClick={onLoadMore}>
    Load more...
  </button>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
