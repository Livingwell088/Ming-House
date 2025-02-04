import {useEffect, useState} from "react";
import API from "../api";
import CartItem from "../components/CartItem";
import MenuPopup from "../components/MenuPopup";
import CartTotal from "../components/CartTotal";
import {Button, Col, Row} from "react-bootstrap";
import '../styles/fonts.css';
import LoginModal from "../components/LoginModal";
import "../styles/cartPage.css"
import CartLeft from "../components/CartLeft";
import {Navigate, redirect, useHref, useNavigate} from "react-router-dom";


const CartPage = (props) => {
    const [cart, setCart] = useState([]);
    const [fullMenu, setFullMenu] = useState([[]])
    const [subtotal, setSubtotal] = useState(0.0)

    const [orderType, setOrderType] = useState(" Select One")
    const [orderTime, setOrderTime] = useState(" Time")
    // const [page, setPage] = useState("Cart")



    const [showPopup, setShowPopup] = useState(false)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);

    const navigate = useNavigate();



    const testing = async () => {
        let currentData = window.sessionStorage.getItem("sessionId")

        if (window.sessionStorage.getItem("loggedIn") === "true"){
            currentData = window.sessionStorage.getItem("username")
        }
        await API.cartAPI.get(currentData)
            .then((data) => data.data)
            .then(async (data) => {
                // console.log(data)

                let full = []
                let price = 0.0
                for (let i = 0; i < data.length; i++) {
                    const number = data[i].item.number;

                    price += await data[i].orderPrice;


                    await API.menuAPI.getByNumber(number)
                        .then((res) => res.data)
                        .then((res) => full.push(res))
                        .catch((error) => console.log(error.message))

                }

                setCart(data);
                setFullMenu(full);
                setSubtotal(price)

            })
            .catch((error) => console.log(error.message))
    }

    const updateCart = async () => {
        console.log("Updating Cart")
        setCart([]);
        // setTimeout(() => {
        //     API.orderAPI.get()
        //         .then((res) => setCart(res.data))
        //         .catch((error) => console.log(error.message))
        // })

        await testing()
    }

    const checkIfLogged = () => {

        if (sessionStorage.getItem("loggedIn") === "false"){

            console.log("NOT LOGGED IN")

            if (orderType !== " Select One"){
                handleShow()

            }
            else{
                alert("Select an Order Type")
            }
        }
        else {
            console.log(cart)

            navigate('/checkoutPage', {state: {orderType: orderType, subtotal: subtotal, orderTime: orderTime, cart: cart}});

        }
    }

    const makeOrder = async () => {

        // console.log("Make Order");

        checkIfLogged()


    }




    useEffect( () => {

        testing()

    }, [cart, subtotal, fullMenu])



    return <div className="App teko">
        <main>
            <h1>YOUR CART</h1>
            <Row>
                <Col xs={1}></Col>
                <Col xs={7}>
                    <CartLeft cart={cart} fullMenu={fullMenu} updateCart={() => updateCart}></CartLeft>
                </Col>

                <Col xs={4}>
                    <CartTotal id={"cartTotal"} page={"Go To Checkout"} orderType={orderType} onChange={(type) => setOrderType(type)} orderTime={orderTime} handleChangeTime={(time) => setOrderTime(time)} subtotal={subtotal} makeOrder={() => makeOrder}  ></CartTotal>
                    <LoginModal show={showPopup} onClose={handleClose} loginScreen={true}></LoginModal>

                </Col>
            </Row>
        </main>

        {/*{page === "Checkout" && <main>*/}
        {/*    <h1>CHECKOUT</h1>*/}
        {/*    <Row>*/}
        {/*        <Col xs={8}>*/}
        {/*            /!*<CartLeft cart={cart} fullMenu={fullMenu} updateCart={() => updateCart}></CartLeft>*!/*/}
        {/*        </Col>*/}

        {/*        <Col xs={4}>*/}
        {/*            <CartTotal id={"cartTotal"} orderType={orderType} onChange={(type) => setOrderType(type)} subtotal={subtotal} makeOrder={() => makeOrder}  ></CartTotal>*/}
        {/*            <LoginModal show={showPopup} onClose={handleClose} loginScreen={true}></LoginModal>*/}

        {/*        </Col>*/}
        {/*    </Row>*/}
        {/*</main>}*/}

    </div>






}

export default CartPage;
