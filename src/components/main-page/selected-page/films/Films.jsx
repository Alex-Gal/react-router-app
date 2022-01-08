import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export const Films = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let isSubscribed = true;

        fetch('https://swapi.dev/api/films')
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
            Films:
            {
                data.map((film) => (
                    <p key={film.title}> 
                        <NavLink className={'urls'} to={`films/${getItemId(film)}`}>{film.title}</NavLink>
                    </p>
                ))
            }
        </div>
    )
}


export const FindFilmById = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/films/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
        return () => {

        };
    }, []);

    if (!data) return <div>loading..</div>

    const { url, title, episode_id, producer, release_date } = data;

    let number = url.split(/(\d+)/g);

    return (
        <div>
            <p>ID: {number[1]}</p>
            <p>title{title}</p>
            <p>episode_id{episode_id}</p>
            <p>producer{producer}</p>
            <p>release_date{release_date}</p>
        </div>
    )
}
