import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../redux/actions/actionFetchBooks";
import { addBook } from "../redux/actions/actionsAddBooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchBook = () => {
  const [title, setTitle] = useState("");

  const state = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title);
    dispatch(fetchBooks(title));
  };

  const handleSave = (title, author) => {
    const bookToSave = { title, author };
    dispatch(addBook(bookToSave));
    toast.info("Livre enregistré");
  };

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid bg-light pb-5">
        <div className="container text-center w-50">
          <h1 className="display-4  pt-5">SEARCH</h1>
          <p>Rechercher un livre dans la bibliothèque</p>
          <form
            action=""
            className="form-inline justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                value={title}
                className="form-control mb-4"
                placeholder="Quoi rechercher ?"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-outline-secondary">
                Rechercher un livre
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="container w-75 "
        style={{ minHeight: "200px", marginTop: "40px" }}
      >
        {state.isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info mb-5" role="status"></div>
          </div>
        )}
        {state.error !== "" && <p>{state.error}</p>}

        <div id="accordion">
          {state.fetchedBooks.length > 0 &&
            state.fetchedBooks.map((book) => {
              return (
                <div className="card mb-2" key={book.id}>
                  <div className="card-header">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target={`#${book.id}`}
                        aria-expanded="false"
                      >
                        {book.volumeInfo.title}
                      </button>
                    </h5>
                    <div
                      id={book.id}
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        {book.volumeInfo?.imageLinks?.thumbnail && (
                          <img
                            className="mb-5"
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                          />
                        )}
                        <br />
                        <h4 className="card-title">
                          Titre : {book.volumeInfo.title}
                        </h4>
                        <h5 className="card-title">
                          Auteurs : {book.volumeInfo.authors}
                        </h5>
                        <p> Description : {book.volumeInfo.description} </p>
                        <a
                          target="_blank"
                          className="btn btn-outline-secondary"
                          rel="noopener noreferrer"
                          href={book.volumeInfo.previewLink}
                        >
                          Plus d'infos
                        </a>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleSave(
                              book.volumeInfo.title,
                              book.volumeInfo.authors
                            )
                          }
                        >
                          Enregistrer
                        </button>
                        <ToastContainer
                          autoClose={500}
                          closeOnClick
                          newestOnTop={true}
                          position="bottom-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default SearchBook;
