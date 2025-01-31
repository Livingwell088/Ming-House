import {useEffect, useState} from "react";
import API from "../api";
import "../styles/cartTotal.css"
import Card from "react-bootstrap/Card";
import OrderTypePopup from "./OrderTypePopup";
import {Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import LoginModal from "./LoginModal";
import TimePickerDropdown from "./TimePickerDropdown";



const CartItem = (props) => {

    // console.log(props.orderType)


    const [orderType, setOrderType] = useState(props.orderType)
    const [deliverAddress, setAddress] = useState(" Enter Your Address")
    const [selectedTime, setSelectedTime] = useState(props.orderTime)
    // const [orderTime, setOrderTime] = useState(" Time")

    // const handleSelectedTimeChange = (event) => {
    //     setSelectedTime(event.target.value)
    //     props.handleChangeTime()
    // }

    const [showPopup, setShowPopup] = useState(false)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);


    // useEffect(() => {
    //     const neededHours = API.timeAPI.get()
    //     setHours(neededHours)
    //         // .then(r => setHours(r))
    //         // .catch((error) => console.log(error))
    // }, []);

    useEffect(() => {
        setOrderType(props.orderType)
    }, [props.orderType]);

    useEffect(() => {
        setSelectedTime(props.orderTime)
    }, [props.orderTime]);

    return <div className={"cartTotal"}>



        <Card className={"totalCard"}>

            <div>
                Ming House:
                217A Chandler St, Worcester MA 01609
            </div>

            {/*<br />*/}

            <div>
                Order Type:
                <a className={"orderTypeLink"} onClick={handleShow}>
                    {orderType}
                </a>
            </div>


            <OrderTypePopup show={showPopup} onClose={handleClose} test={(type) => props.onChange(type)}></OrderTypePopup>

            {/*{(orderType === " Delivery") && <div>*/}
            {/*    Deliver to: <a> {deliverAddress}*/}

            {/*</a>*/}
            {/*</div>}*/}

            <div>
                Order Time: <TimePickerDropdown orderTime={selectedTime} handleChangeTime={(time) => props.handleChangeTime(time)} />


                {/*<Button onClick={clickedTime}>Time</Button>*/}

            </div>


        </Card>

        <br />

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

        <br />

        <Button onClick={props.makeOrder()}>Place Order</Button>

        {/*<LoginModal show={props.showPopup} onClose={props.handleClose} loginScreen={true}></LoginModal>*/}


    </div>
}

export default CartItem;
