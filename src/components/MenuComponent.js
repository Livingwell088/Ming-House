
import * as React from 'react';
import APIService from '../test'
import MenuServiceFetch from "../Services/MenuServiceFetch";
import {Grid} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import '../styles/fonts.css';
import "../styles/menuComponent.css"
import MenuCard from "./MenuCard";
import {useEffect, useState} from "react";




const MenuComponent = (props) => {

    const [menu, setMenu] = useState(props.menu);
    const [categories, setCategories] = useState(props.categories);
    const [types, setTypes] = useState(props.types)


    const test = (type) => {
        if (type === "All"){
            setCategories(props.categories)
        }
        else{
            setCategories([type])

        }

    }



    console.log(props.menu)
    // console.log(menu)

    return (
        <div>
            <Row id={"menuRow"}>
                <Col xs={1}></Col>
                <Col xs={2}>
                    <ul key={"p"} id={"foodTypes"} >
                        {
                            types.map(current =>
                                <li key={current} id={current} onClick={() => test(current)}>{current}</li>
                            // <li onClick={() => this.t(current)}>{current}</li>
                            )
                        }
                    </ul>
                </Col>
                <Col xs={9}>
                    {
                        categories.map(current =>
                            <Row>
                                <h2 className={"headers spicy-rice-regular"}>{current}</h2>
                                {
                                    props.menu.filter((type) => type.category === current).map(item => {
                                        // console.log(item)
                                        return <Col className={"col-6"}><MenuCard number={item.number} name={item.name} size={item.size} price={item.price} menu={item}/></Col>
                                    })


                                }
                            </Row>
                        )
                    }

                </Col>
            </Row>

        </div>
    )



}

export default  MenuComponent;