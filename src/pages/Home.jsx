import React, { useEffect, useState } from "react";
import PeopleCard from "../components/PeopleCard";
import VehicleCard from "../components/VehicleCard";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"


export const Home = () => {
    const {store, dispatch} = useGlobalReducer()
    const [characters, setCharacters] = useState([]);
    const [vehicles, setVehicles] = useState([]);
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

    
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/vehicles");
                const data = await res.json();
                if (res.ok){
                    dispatch({type: "set_vehicles", payload: {vehicles: data.results}})
                }else{
                    dispatch({type: "set_vehicles", payload: {vehicles: false}})
                }
            } catch (error) {
                console.error("Error cargando personajes:", error);
                dispatch({type: "set_vehicles", payload: {vehicles: false}})
            }
        };

        fetchVehicles();
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

             <h2 className="text-danger ms-3 mb-3">Vehicles</h2>

            {/* Scroll horizontal limpio */}
            <div
                className="d-flex flex-row overflow-auto px-3 pb-3 gap-3"
                style={{ whiteSpace: "nowrap" }}
            >
                {store.vehicles && store.vehicles.length > 0 && store.vehicles.map((item) => (
                    <div key={item.uid} style={{ flex: "0 0 auto" }}>
                        <VehicleCard name={item.name} uid={item.uid} />
                    </div>
                ))}
            </div>
        </div>
    );


   
};


