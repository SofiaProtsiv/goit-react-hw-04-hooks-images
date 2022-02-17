import PropTypes from "prop-types";
import style from "./button.module.css";

const Button = ({ onClick }) => (
  <button type="button" className={style.button} onClick={onClick}>
    Load more...
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
