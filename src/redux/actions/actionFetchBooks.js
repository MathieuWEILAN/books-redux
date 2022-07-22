import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  FETCH_BOOKS_LOADING,
} from "../contants";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyC_bPGT2EUBHqbH-qD1uo9XgRm_0TD1KL8";

export const fetchBooksLoading = () => {
  return { type: FETCH_BOOKS_LOADING };
};

export const fetchBooksSuccess = (data) => {
  return { type: FETCH_BOOKS_SUCCESS, payload: data };
};

export const fetchBooksError = (error) => {
  return { type: FETCH_BOOKS_ERROR, payload: error };
};

export const fetchBooks = (title) => {
  return (dispatch) => {
    dispatch(fetchBooksLoading());
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResult=20&key=${GOOGLE_API_KEY}`
      )
      .then((res) => dispatch(fetchBooksSuccess(res.data.items)))
      .catch((err) => dispatch(fetchBooksError(err.message)));
  };
};
