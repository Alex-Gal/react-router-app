import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export const Planets = () => {
    const[data, setData] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        
        fetch('https://swapi.dev/api/planets')
        .then((res) => res.json())
        .then(({ results }) => {
            if(isSubscribed) {
                setData(results);
            }
        });

    return () => {
        isSubscribed = false;
    };
}, []);

    if (!data) return <div>loading..</div>

    const getItemId = (item) => {
        let {url} = item;
        let number = url.split(/(\d+)/g);
        return number[1];
    }

    return (
        <div>
            Planets: 
            {
                data.map((planet) => (
                    <p key={planet.name}><NavLink className={'urls'} to={`planets/${getItemId(planet)}`}>{planet.name}</NavLink></p>
                ))
            }
        </div>
    )
}


export const FindPlanetsById = () => {
    const {id} = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}`)
        .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
        return () => {

        };
    }, []);

    if (!data) return <div>loading..</div>

    const {url, name, climate, terrain, population} = data;

    let number = url.split(/(\d+)/g);

    return (
        <div>
            <p>ID: {number[1]}</p>
            <p>name{name}</p>
            <p>climate{climate}</p>
            <p>terrain{terrain}</p>
            <p>population{population}</p>
        </div>
    )
}
