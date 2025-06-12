import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PeopleCard = ({ name, uid }) => {
    const { store, dispatch } = useGlobalReducer()

    //const isFavorite = person && store.favorites.some(fav => fav.name === person.name);
    const isFavorite = () => {
        if (store.favorites){
            return store.favorites.some(fav => fav.name === name)
        }
        
    }

    const handleFavorite = () => {
       
        if (isFavorite()) {
            dispatch({type: "set_favorites", payload: {favorites:store.favorites.filter(item => item.name != name)}})
        } else {
            dispatch({type: "set_favorites", payload: {favorites:[...store.favorites, {name:name}]}})
        }
    };

   // if (!person) return null; // 🔥 Evita renderizar si aún no carga

    return (
        <div
            className="card shadow-sm"
            style={{ width: "400px", height: "200px", overflow: "hidden", position: "relative" }}
        >
            <img
                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${uid}.jpg`}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400?text=No+Image";
                }}
            />
            <div
                className="position-absolute bottom-0 w-100 text-white px-3 py-2"
                style={{ background: "rgba(0,0,0,0.6)" }}
            >
                <h6 className="m-0">{name}</h6>
                <small>
                    {/* Gender: {person.gender} | Hair: {person.hair_color} | Eyes: {person.eye_color} */}
                </small>
                <div className="d-flex justify-content-between align-items-center mt-1">
                    <Link to={`/single/${uid}`} className="btn btn-sm btn-primary">
                        Learn more!
                    </Link>
                    <button
                       onClick={handleFavorite}
                        style={{
                            background: "none",
                            border: "none",
                           color: isFavorite() ? "red" : "#f0ad4e",
                            fontSize: "1.2rem",
                            cursor: "pointer"
                        }}
                        title={isFavorite() ? "Quitar de favoritos" : "Agregar a favoritos"}
                    > 
                        <i class={isFavorite() ? "fa-solid fa-heart":"fa-regular fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeopleCard;


