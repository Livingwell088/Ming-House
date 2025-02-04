import {Col, Row} from "react-bootstrap";
import CartTotal from "../components/CartTotal";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CheckoutLeft from "../components/CheckoutLeft";
import API from "../api";


const CheckoutPage = (props) => {

    const location = useLocation();


    const [orderType, setOrderType] = useState(location.state.orderType)
    const [subtotal, setSubtotal] = useState(location.state.subtotal)
    const [orderTime, setOrderTime] = useState(location.state.orderTime)
    const [cart, setCart] = useState(location.state.cart)
    console.log(cart)


    const [user, setUser] = useState({})
    const [fields, setFields] = useState({"phoneNumber": "", "address": ""})


    const handleChangeUser = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUser(values => ({...values, [name]: value}))
        console.log(name, value, user)

    }

    const handleChangeField = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFields(values => ({...values, [name]: value}))
    }

    const getUser = async () => {
        let username = (window.sessionStorage.getItem("username"))

        await API.userAPI.getUser(username)
            .then(r => r.data)
            .then(r => setUser(r))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUser()

        // console.log(test)

    }, []);


    const makeOrder = () => {
        console.log("Making Order")

        API.orderAPI.create("Test Order", API.priceAPI.price(subtotal * 1.07), orderType, fields.address, window.sessionStorage.getItem("username"), cart)
            .then(r => console.log(r.data))
            .catch((error) => console.log(error))
    }



    return <div className={"App teko"}>
        <main>
            <h1>Checkout</h1>

            <Row>
                <Col xs={1}></Col>
                <Col xs={7}>
                    <CheckoutLeft orderType={orderType} user={user} handleChangeUser={handleChangeUser} fields={fields} handleChangeFields={handleChangeField} />
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
