import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const DetailVehicle = () => {
    const { uid } = useParams();
    const [vehicle, setvehicle] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`);
                const data = await res.json();
                setvehicle(data.result.properties);
            } catch (error) {
                console.error("Error al cargar personaje:", error);
            }
        };

        fetchVehicle();
    }, [uid]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${uid}.jpg`}
                        className="img-fluid rounded shadow"
                        alt={vehicle?.name}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x400?text=No+Image";
                        }}
                    />
                </div>
                <div className="col-md-6 text-start">
                    <h2>{vehicle?.name}</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, pariatur accusamus amet
                        repellendus dolore, officia quas fugiat similique provident quibusdam? Obcaecati aspernatur
                        architecto ad.
                    </p>
                    <hr />
                    <div><strong>Cargo Capacity:</strong> {vehicle?.cargo_capacity}</div>
                    <div><strong>Passenger:</strong> {vehicle?.passengers}</div>
                    <div><strong>Max_Atmosphering_Speed:</strong> {vehicle?.max_atmosphering_speed}</div>
                    <div><strong>Crew:</strong> {vehicle?.crew}</div>
                    <div><strong>Length:</strong> {vehicle?.length}</div>
                    <div className="mt-3">
                        <Link to="/" className="btn btn-primary">⬅ Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


