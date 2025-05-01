import * as React from 'react';
import APIService from '../test'
import MenuServiceFetch from "../Services/MenuServiceFetch";
import {Grid} from "@mui/material";
import {Col, Row} from "react-bootstrap";

import "../styles/menuComponent.css"


export default class MenuComponent extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            menu: [],
            categories: [],
            types: []
        }
    }

    t = (type) => {
        if (type == "All"){
            let current = this.state.types.slice(1)
            this.setState({categories: current});
        }
        else{
            this.setState({categories: [type]});

        }
        // window.location.reload()
      }
    async componentDidMount() {
        const res = await fetch('/menu/getMenu');
        const body = await res.json();

        // this.setState({menu: body})
        // MenuServiceFetch.getMenu().then((res) => {
        //     this.setState({menu: res})
        // });

        let categories = new Set()

        // console.log(menu.category)
        for (let i = 0; i < body.length; i++){
            categories.add(body[i].category)
        }
        categories = Array.from(categories)

        let menus = Array.from(body)

        let newMenu = []
        let newMenuId = []
        for (let i = 0; i < menus.length; i++){
            if (newMenuId.includes(menus[i].number)){
                for (let n = 0; n < newMenu.length; n++){
                    if (newMenu[n].number == menus[i].number){
                        newMenu[n].size = newMenu[n].size.concat(",", menus[i].size)
                        newMenu[n].price = newMenu[n].price.concat(",", menus[i].price)
                    }
                }
            }
            else{
                newMenu.push(menus[i])
                newMenuId.push(menus[i].number)
            }

        }
        this.setState({menu: newMenu})


        let types = {}
        for (let i = 0; i < categories.length; i++){
            types[categories[i]] = menus.filter((item) => item.category === categories[i])

        }


        categories = ["Appetizer", "Soup", "Chow Mein", "Fried Rice", "Lo Mein", "Mei Fun",
        "Pork", "Poultry", "Beef", "Seafood", "Egg Foo Young", "Sweet And Sour", "Vegetable",
        "Moo Shu", "Special Combination Plates", "Chefs Specialties", "All Day Special", "Special Healthy Diet",
        "Other", "Lunch Special", "American Dishes"]

        // console.log(this.state.menu)
        this.setState({categories: categories})

        categories = ["All", "Appetizer", "Soup", "Chow Mein", "Fried Rice", "Lo Mein", "Mei Fun",
        "Pork", "Poultry", "Beef", "Seafood", "Egg Foo Young", "Sweet And Sour", "Vegetable",
        "Moo Shu", "Special Combination Plates", "Chefs Specialties", "All Day Special", "Special Healthy Diet",
        "Other", "Lunch Special", "American Dishes"]
        this.setState({types: categories})

        // this.setState({types: types})
        // console.log(types)


    }

    render() {
        const {menu, categories, types} = this.state


        // console.log(types)
        return (
            <div>
                <Row>
                    <h2 className="">Menu</h2>
                <Col xs={3}>
                    <ul id={"foodTypes"}>
                        {
                            this.state.types.map(current =>
                            <li onClick={() => this.t(current)}>{current}</li>
                            )
                        }
                    </ul>
                </Col>
                    <Col>

                        {
                            this.state.categories.map(current =>

                                <table className="table table-striped" id={"menuTable"}>
                                <thead>
                                <tr>
                                    <th colSpan={6}>{current}</th>
                                    {/*<th></th>*/}
                                    {/*<th></th>*/}
                                    {/*<th></th>*/}
                                    {/*<th></th>*/}
                                    {/*<th></th>*/}
                                </tr>
                                </thead>
                                    <tbody>
                                    {
                                        menu.filter((type) => type.category === current).map(item =>
                                        {
                                            let sizes = item.size.split(",")
                                            for (let i = 0; i < sizes.length; i++){
                                                if (sizes[i] === ""){
                                                    continue
                                                }
                                                if (sizes[i][0] !== "("){
                                                    sizes[i] = "(" + sizes[i] + ")"
                                                }
                                            }
                                            if (sizes.length < 2){
                                                return <tr id={item.number}>
                                                    <td>{item.number}</td>
                                                    <td>{item.name}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className={"size"}>{sizes[0]}</td>
                                                    <td>{"$" + item.price.split(",")[0]}</td>

                                                </tr>
                                            }

                                            else if (sizes.length === 2){
                                                return <tr id={item.number}>
                                                    <td>{item.number}</td>
                                                    <td>{item.name}</td>
                                                    <td className={"size"}>{sizes[0]}</td>
                                                    <td>{"$" + item.price.split(",")[0]}</td>
                                                    <td className={"size"}>{sizes[1]}</td>
                                                    <td>{"$" + item.price.split(",")[1]}</td>

                                                </tr>
                                            }
                                            else{
                                                console.log(item)
                                            }

                                            }

                                        )


                                    }
                                </tbody>

                                </table>
                            )
                        }

                    </Col>
                </Row>

            </div>
        )
    }

}


