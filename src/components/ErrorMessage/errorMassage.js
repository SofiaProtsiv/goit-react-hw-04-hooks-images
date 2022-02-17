import style from "./errorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div role="alert" className={style.errorMessage}>
      <h2>Oops! 😫</h2>
      <p>
        Sorry, no images were found or something went wrong. Please try again,
        or <a href="/">refresh the page</a>.
      </p>
    </div>
  );
}
