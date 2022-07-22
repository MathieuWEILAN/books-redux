import { ADD_BOOKS, REMOVE_SELECTED_BOOK, REMOVE_ALL } from "../contants";

export const addBook = (data) => {
  return {
    type: ADD_BOOKS,
    payload: data,
  };
};

export const removeBook = (id) => {
  return { type: REMOVE_SELECTED_BOOK, payload: id };
};

export const removeAll = () => {
  return { type: REMOVE_ALL };
};
