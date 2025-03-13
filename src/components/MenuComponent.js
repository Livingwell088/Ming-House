
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



    // console.log(props.menu)

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
                                <h3 className={"headers trade-winds-regular"} style={{color: "rgb(238, 121, 89)"}}>{current}</h3>
                                {

                                    Object.keys(props.menu).map((item, i) => {

                                        if (current === props.menu[item][0].category){
                                            // console.log(Object.keys(props.menu[item]).length)
                                            if (Object.keys(props.menu[item]).length === 1){
                                                let current = props.menu[item][0]
                                                return <Col className={"col-6"}><MenuCard id={current.id} number={current.number} name={current.name} size={[current.size]} price={[current.price]} menu={[current]}/></Col>

                                            }
                                            else{
                                                let sizes = []
                                                let prices = []
                                                let items = []
                                                for (let n = 0; n < Object.keys(props.menu[item]).length; n++){
                                                    let current = props.menu[item][n]
                                                    sizes.push(current.size)
                                                    prices.push(current.price)
                                                    items.push(current)
                                                }

                                                return <Col className={"col-6"}><MenuCard id={items[0].id} number={items[0].number} name={items[0].name} size={sizes} price={prices} menu={items}/></Col>

                                            }
                                        }

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