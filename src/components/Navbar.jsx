import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer()

    return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                 <img
                 src="https://logos-world.net/wp-content/uploads/2020/11/Star-Wars-Logo.png"
                   alt="Star Wars"
                      height="60"
                       style={{ filter: "invert(1)" }}
                 />

            <div className="ms-auto">
                <div className="dropdown">
                    <button
                        className="btn btn-warning dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites <span className="badge bg-dark">{store.favorites && store.favorites.length}</span>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        { store.favorites && store.favorites.length === 0 ? (
                            <li className="dropdown-item text-muted">No favorites yet</li>
                        ) : (
                            store.favorites && store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                    <span>
                                        <strong>{fav.name}</strong>
                                          </span>

                                    <button
                                        onClick={() => dispatch({type: "set_favorites", payload: {favorites:store.favorites.filter(item => item.name != fav.name)}})}
                                        className="btn btn-sm btn-link text-danger ms-3 p-0"
                                        title="Remove from favorites"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
