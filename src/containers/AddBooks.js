import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addBook,
  removeBook,
  removeAll,
} from "../redux/actions/actionsAddBooks";
import FlipMove from "react-flip-move";

const AddBooks = ({ libraryData, addBook, removeBook, removeAll }) => {
  const initialState = { title: "", author: "" };
  const [newData, setNewData] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit", newData);
    addBook(newData);
    setNewData(initialState);
  };

  const remove = (e, id) => {
    e.preventDefault();
    removeBook(id);
  };

  const removeAllBooks = (e) => {
    e.preventDefault();
    console.log("TEST REMOVE");
    removeAll();
  };

  const displayData =
    libraryData.length > 0 ? (
      <FlipMove>
        {libraryData.map((el) => {
          return (
            <li
              className="list-group-item list-group-item-light d-flex justify-content-between  border border-secondary-light mb-2 p-2"
              key={el.id}
            >
              <p>
                <strong>Titre : </strong>
                <span>{el.title}</span>
              </p>
              <p>
                <strong>Auteur : </strong> <span>{el.author}</span>
              </p>
              <button
                className="btn btn-danger"
                onClick={(e) => remove(e, el.id)}
              >
                x
              </button>
            </li>
          );
        })}
      </FlipMove>
    ) : (
      <p className="text-center">Aucune data à afficher</p>
    );
  console.log(displayData);
  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid bg-light pb-5">
        <div className="container text-center w-50">
          <h1 className="display-4  pt-5">BOOKS</h1>
          <p>Ajouter un livre à votre bibliothèque</p>
          <form
            action=""
            className="form-inline justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                value={newData.title}
                type="text"
                className="form-control mb-4"
                placeholder="Titre"
                required
                onChange={(e) => {
                  setNewData({ ...newData, title: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <input
                value={newData.author}
                type="text"
                className="form-control mb-4"
                placeholder="Auteur"
                required
                onChange={(e) => {
                  setNewData({ ...newData, author: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary">
                Ajouter un livre
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="container w-75 "
        style={{ minHeight: "200px", marginTop: "40px" }}
      >
        {displayData && <div>{displayData} </div>}
        {libraryData.length ? (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger mt-4 mb-5"
              onClick={removeAllBooks}
            >
              Effacer tous les livres
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return { libraryData: state.library };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (param) => dispatch(addBook(param)),
    removeBook: (id) => dispatch(removeBook(id)),
    removeAll: () => {
      dispatch(removeAll());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
