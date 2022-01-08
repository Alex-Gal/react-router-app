import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export const Starships = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let isSubscribed = true;

        fetch('https://swapi.dev/api/starships')
            .then((res) => res.json())
            .then(({ results }) => {
                if (isSubscribed) {
                    setData(results);
                }
            });

        return () => {
            isSubscribed = false;
        };
    }, []);

    if (!data) return <div>loading..</div>

    const getItemId = (item) => {
        let { url } = item;
        let number = url.split(/(\d+)/g);
        return number[1];
    }

    return (
        <div>
            Starships:
            {
                data.map((ship) => (
                    <p key={ship.name}>
                        <NavLink className={'urls'} to={`starships/${getItemId(ship)}`}>{ship.name}</NavLink>
                    </p>
                ))
            }
        </div>
    )
}


export const FindStarshipsById = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
        return () => {

        };
    }, []);

    if (!data) return <div>loading..</div>

    const { url, name, model, manufacturer, length } = data;

    let number = url.split(/(\d+)/g);

    return (
        <div>
            <p>ID: {number[1]}</p>
            <p>name{name}</p>
            <p>model{model}</p>
            <p>manufacturer{manufacturer}</p>
            <p>length{length}</p>
        </div>
    )
}
