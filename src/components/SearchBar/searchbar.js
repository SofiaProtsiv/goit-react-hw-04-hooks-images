import { Component } from "react";
import { ImSearch } from "react-icons/im";
import style from "./searchbar.module.css";

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  handleNameChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.searchQuery);

    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.button}>
            <ImSearch style={{ marginRight: 8 }} />
            Search
          </button>
          <input
            className={style.input}
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
