import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const DetailCharacter = () => {
    const { uid } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
                const data = await res.json();
                setCharacter(data.result.properties);
            } catch (error) {
                console.error("Error al cargar personaje:", error);
            }
        };

        fetchCharacter();
    }, [uid]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${uid}.jpg`}
                        className="img-fluid rounded shadow"
                        alt={character?.name}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x400?text=No+Image";
                        }}
                    />
                </div>
                <div className="col-md-6 text-start">
                    <h2>{character?.name}</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, pariatur accusamus amet
                        repellendus dolore, officia quas fugiat similique provident quibusdam? Obcaecati aspernatur
                        architecto ad.
                    </p>
                    <hr />
                    <div><strong>Birth Year:</strong> {character?.birth_year}</div>
                    <div><strong>Gender:</strong> {character?.gender}</div>
                    <div><strong>Height:</strong> {character?.height}</div>
                    <div><strong>Skin Color:</strong> {character?.skin_color}</div>
                    <div><strong>Eye Color:</strong> {character?.eye_color}</div>
                    <div className="mt-3">
                        <Link to="/" className="btn btn-primary">⬅ Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


