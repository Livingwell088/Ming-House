// import logo from './logo.svg';
import '../styles/menuPage.css';
import Appbar from "../components/Appbar"
import MenuComponent from "../components/MenuComponent";
import {Component} from "react";
import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import '../App';
import {Container, CssBaseline} from "@mui/material";
import Typography from "@mui/material/Typography";

const MenuPage = (props) => {

    // const [groups, setGroups] = useState([]);
    // const [loading, setLoading] = useState(false);
    //
    // useEffect(() => {
    //     setLoading(true);
    //
    //     fetch('http://localhost:8080/menu/getMenu', {
    //         method: "get",
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json',
    //         },
    //         'credentials': 'same-origin'
    //     })
    //         .then(response => console.log(response.json()))
    //         .then(response => response.json())
    //         .then(data => {
    //             setGroups(data);
    //             setLoading(false);
    //         })
    // }, []);
    //
    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <>
            <CssBaseline />
            <div className="App">
                <main>
                    <div>

                        <Container>

                            <MenuComponent />
                            {/*{groups.map(group =>*/}
                            {/*    <div key={group.id}>*/}
                            {/*        {group.name}, {group.size}*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </Container>
                    </div>
                </main>
                {/*<header className="App-header">*/}
                {/*    <img src={logo} className="App-logo" alt="logo" />*/}
                {/*    <div className="App-intro">*/}
                {/*        <h2>JUG List</h2>*/}
                {/*        {groups.map(group =>*/}
                {/*            <div key={group.id}>*/}
                {/*                {group.name}, {group.size}*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*</header>*/}
            </div>
        </>
    );
}

export default MenuPage;
