import {useEffect, useState} from "react";
import API from "../api";
import "../styles/cartTotal.css"
import Card from "react-bootstrap/Card";
import OrderTypePopup from "./OrderTypePopup";



const CartItem = (props) => {

    // console.log(props)

    const [orderType, setOrderType] = useState(" Select One")
    const [deliverAddress, setAddress] = useState(" Enter Your Address")

    const [showPopup, setShowPopup] = useState(false)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);


    return <div className={"cartTotal"}>


        <div>
            Order Type:
            <a className={"orderTypeLink"} onClick={handleShow}>
                {orderType}
            </a>
            <OrderTypePopup show={showPopup} onClose={handleClose} test={(type) => setOrderType(type)}></OrderTypePopup>

            {(orderType === " Pickup") && <div>
                Pickup At: Ming House 217A Chandler St, Worcester MA 01609
            </div>}


            {(orderType === " Delivery") && <div>
                Deliver to: <a> {deliverAddress}

            </a>
            </div>}
        </div>

        <Card className={"totalCard"}>

            <table>
                <tbody>
                <tr>
                    <td>Subtotal: </td>
                    <td className={"tablePrice"}>${API.priceAPI.price(props.subtotal)}</td>
                </tr>
                <tr>
                    <td>Tax: </td>
                    <td className={"tablePrice"}>${API.priceAPI.price(props.subtotal * 0.07)}</td>
                </tr>
                <tr>
                    <td><h4>Total: </h4></td>
                    <td className={"tablePrice"}><h4>${API.priceAPI.price(props.subtotal * 1.07)}</h4></td>
                </tr>

                </tbody>
            </table>
            {/*<h2>Subtotal: ${API.priceAPI.price(props.subtotal)}</h2>*/}
            {/*<h2>Tax: ${API.priceAPI.price(props.subtotal * 0.07)}</h2>*/}
            {/*<h2>Total: ${API.priceAPI.price(props.subtotal * 1.07)}</h2>*/}
        </Card>


    </div>
}

export default CartItem;
