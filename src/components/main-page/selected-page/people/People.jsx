import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export const People = () => {
    const[data, setData] = useState(null);

    useEffect(() => {
        let isSubscribed = true;

        fetch('https://swapi.dev/api/people')
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
            People: 
            {
                data.map((people) => (
                    <p key={people.name}><NavLink className={'urls'} to={`people/${getItemId(people)}`}>{people.name}</NavLink></p>
                ))
            }
        </div>
    )
}


export const FindPeopleById = () => {
    const {id} = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}`)
        .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
        return () => {

        };
    }, []);

    if (!data) return <div>loading..</div>

    const {url, name, height, mass, eye_color} = data;

    let number = url.split(/(\d+)/g);

    return (
        <div>
            <p>ID: {number[1]}</p>
            <p>name{name}</p>
            <p>height{height}</p>
            <p>mass{mass}</p>
            <p>eye_color{eye_color}</p>
        </div>
    )
}
