import { ADD_BOOKS, REMOVE_SELECTED_BOOK, REMOVE_ALL } from "../contants";
import { v4 as uuidv4 } from "uuid";

const initialState = { books: [] };

// REDUCER //

const reducerAddBooks = (state = initialState.books, action) => {
  let newState = [...state];

  if (localStorage.getItem("booksData")) {
    state = JSON.parse(localStorage.getItem("booksData"));
  }

  switch (action.type) {
    case ADD_BOOKS:
      newState.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("booksData", JSON.stringify(newState));
      return newState;

    case REMOVE_SELECTED_BOOK:
      const removeSelectedBookArray = newState.filter(
        (el) => el.id !== action.payload
      );
      localStorage.setItem(
        "booksData",
        JSON.stringify(removeSelectedBookArray)
      );
      return removeSelectedBookArray;

    case REMOVE_ALL:
      newState = [];
      localStorage.removeItem("booksData");
      return newState;

    default:
      return state;
  }
};

export default reducerAddBooks;
