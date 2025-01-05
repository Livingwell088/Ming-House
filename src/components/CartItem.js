import Card from "react-bootstrap/Card";
import {Button, Col, Row} from "react-bootstrap";
import MenuPopup from "./MenuPopup";
import "../styles/CartItem.css"
import Image from "react-bootstrap/Image";
import API from "../api";
import {useEffect, useState} from "react";


const CartItem = (props) => {

    const minus = (item) => {

        console.log("Minus")
        let current = item;

        console.log(current)

        if (current.quantity === 1){
            API.cartAPI.delete(current.orderName, current.orderPrice, current.quantity, current.item, current.cartId, current.specialInstruction)
                .then(r => props.updateCart())
                .catch((error) => console.log(error.message))
        }
        else{
            API.cartAPI.delete(current.orderName, current.orderPrice, current.quantity, current.item, current.cartId, current.specialInstruction)
                .then(r => {
                    props.updateCart();
                })
                .catch((error) => console.log(error.message))
        }
    }

    const plus = (item) => {
        let current = item;


        API.cartAPI.create(
            current.orderName, current.item.price, 1, current.item, sessionStorage.getItem("sessionId").toString(), current.specialInstruction)
            .then(r => props.updateCart())
            .catch((error) => console.log(error.message))

        // console.log(current)



    }

    const update = () => {
        console.log("Cart Item Update")
        props.updateCart();
        console.log(props)

    }


    const [menu, setMenu] = useState([])



    const [showPopup, setShowPopup] = useState(false)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);


    // console.log(props)


    return <div className={"cartCard"}>
        <Row>
            <Col xs={2}><Image src={"/images/" + props.item.number + ".png"} className={"menuImg"}
                               style={{height: "75%",
                                   margin: "auto"}}
                               rounded /></Col>
            <Col style={{textAlign: "left"}}>
                <h5>{props.name}</h5>
                <p>{props.item.size}</p>
            </Col>
            <Col >
                    {/*className={"d-flex align-items-center"}*/}
                <Row>
                    <Button style={{width: "15%"}} variant="secondary" onClick={() => minus(props.order)} >
                        -
                    </Button>
                    <h5 style={{width: "15%"}}>{props.order.quantity}</h5>
                    <Button variant="secondary" style={{width: "15%"}} onClick={() => plus(props.order)}>
                        +
                    </Button>
                </Row>

                <Row><h5>{API.priceAPI.price(props.price)}</h5></Row>
            </Col>
            <Col><Button style={{width: "15%"}} variant="secondary" onClick={handleShow} >
                Edit
            </Button></Col>
        </Row>
        <MenuPopup show={showPopup} onClose={handleClose} id={props.id} item={props.full} quantity={props.order.quantity} do={"Edit"} update={update} size={(props.item.price)}/>

    </div>

}



export default CartItem;
