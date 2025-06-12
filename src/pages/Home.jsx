import React, { useEffect, useState } from "react";
import PeopleCard from "../components/PeopleCard";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"


export const Home = () => {
    const {store, dispatch} = useGlobalReducer()
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/people");
                const data = await res.json();
                if (res.ok){
                    dispatch({type: "set_characters", payload: {characters: data.results}})
                }else{
                    dispatch({type: "set_characters", payload: {characters: false}})
                }
            } catch (error) {
                console.error("Error cargando personajes:", error);
                dispatch({type: "set_characters", payload: {characters: false}})
            }
        };

        fetchCharacters();
    }, []);

    return (
        <div className="container-fluid mt-4">
            <h2 className="text-danger ms-3 mb-3">Characters</h2>

            {/* Scroll horizontal limpio */}
            <div
                className="d-flex flex-row overflow-auto px-3 pb-3 gap-3"
                style={{ whiteSpace: "nowrap" }}
            >
                {store.characters && store.characters.length > 0 && store.characters.map((item) => (
                    <div key={item.uid} style={{ flex: "0 0 auto" }}>
                        <PeopleCard name={item.name} uid={item.uid} />
                    </div>
                ))}
            </div>
        </div>
    );
};


