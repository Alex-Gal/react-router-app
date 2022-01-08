import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { Films, FindFilmById } from "./selected-page/films/Films";
import { People, FindPeopleById } from "./selected-page/people/People";
import { Planets, FindPlanetsById } from "./selected-page/planets/Planets";
import { Starships, FindStarshipsById } from "./selected-page/starships/Starships";

export const paths = {
    main: '/',
    films: '/films',
    people: '/people',
    planets: '/planets',
    starships: '/starships'
}

export const MainPage = () => {
    return (
        <div>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route exact path={paths.main} component={() => <div>Main Page</div>} />
                    <Route exact path={`${paths.films}/:id`} component={FindFilmById} />
                    <Route path={`${paths.films}`} component={Films} />
                    <Route exact path={`${paths.people}/:id`} component={FindPeopleById} />
                    <Route path={`${paths.people}`} component={People} />
                    <Route exact path={`${paths.planets}/:id`} component={FindPlanetsById} />
                    <Route path={`${paths.planets}`} component={Planets} />
                    <Route exact path={`${paths.starships}/:id`} component={FindStarshipsById} />
                    <Route path={`${paths.starships}`} component={Starships} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}


const Nav = () => (
    <div>
        <NavLink exact activeClassName="active" to={paths.main}>Main</NavLink>
        <NavLink activeClassName="active" to={paths.films}>Films</NavLink>
        <NavLink activeClassName="active" to={paths.people}>People</NavLink>
        <NavLink activeClassName="active" to={paths.planets}>Planets</NavLink>
        <NavLink activeClassName="active" to={paths.starships}>Starships</NavLink>
    </div>
);