import {Col, Row} from "react-bootstrap";
import CartTotal from "../components/CartTotal";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CheckoutLeft from "../components/CheckoutLeft";
import API from "../api";


const CheckoutPage = (props) => {

    const location = useLocation();

    console.log(location.state)

    const [orderType, setOrderType] = useState(location.state.orderType)
    const [subtotal, setSubtotal] = useState(location.state.subtotal)
    const [orderTime, setOrderTime] = useState(location.state.orderTime)


    const makeOrder = () => {
        console.log("Making Order")
    }



    return <div className={"App teko"}>
        <main>
            <h1>Checkout</h1>

            <Row>
                <Col xs={1}></Col>
                <Col xs={7}>
                    <CheckoutLeft orderType={orderType} />
                </Col>
                <Col xs={4}>
                    {/*<p>{orderType}</p>*/}
                    {/*<p>{subtotal}</p>*/}
                    <CartTotal id={"cartTotal"} page={"Place Order"} onChange={(type) => setOrderType(type)} orderType={orderType} orderTime={orderTime} handleChangeTime={(time) => setOrderTime(time)} subtotal={subtotal} makeOrder={() => makeOrder} ></CartTotal>
                </Col>
            </Row>
        </main>

    </div>

}


export default CheckoutPage;
