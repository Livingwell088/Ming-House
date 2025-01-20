import {useEffect, useState} from "react";
import API from "../api";
import CartItem from "../components/CartItem";
import MenuPopup from "../components/MenuPopup";
import CartTotal from "../components/CartTotal";
import {Button, Col, Row} from "react-bootstrap";
import '../styles/fonts.css';
import LoginModal from "../components/LoginModal";
import "../styles/cartPage.css"


const CartPage = (props) => {
    const [cart, setCart] = useState([]);
    const [fullMenu, setFullMenu] = useState([[]])
    const [subtotal, setSubtotal] = useState(0.0)

    const [orderType, setOrderType] = useState(" Select One")



    const [showPopup, setShowPopup] = useState(false)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);


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
            console.log("LOGGED IN")

            API.orderAPI.create("orderName", 10.25, "PickUp", "Address", window.sessionStorage.getItem("username"), cart)
                .then(r => {
                    console.log("Order Placed")
                    console.log(r.data)
                })
                .catch((error) => console.log(error.message))
        }
    }

    const makeOrder = async () => {

        // console.log(orderType);

        checkIfLogged()

        // await API.orderAPI.create("Test", 10.0, cart)
        //     .then(r => console.log(r))
        //     .catch((error) => console.log(error.message))
    }




    useEffect( () => {

        testing()

    }, [cart, subtotal, fullMenu])



    if (cart.length === 0){
        return <div className="App teko">
            <main>
                <h1>
                    YOUR CART
                </h1>
                <Row>
                    <Col xs={8}>
                        <h3>No Items in Cart</h3>
                        <h4>Browse <a className={"Link"} href={"/menuPage"}>
                            Menu
                        </a></h4>
                    </Col>
                    <Col xs={4}>
                        <CartTotal id={"cartTotal"} orderType={orderType} onChange={(type) => setOrderType(type)} subtotal={subtotal}></CartTotal>
                    </Col>
                </Row>
            </main>
        </div>
    }

    else{
        return <div className="App teko">
            <main>
                <h1>
                    YOUR CART
                </h1>

                <div>
                    <Row>
                        <Col xs={8}>

                            {cart.map((item, index) => {

                                return <><CartItem id={item.id} name={item.orderName} price={item.orderPrice} item={item.item} order={item} updateCart={updateCart} full={fullMenu[index]}></CartItem>
                                </>


                            })}
                        </Col>
                        <Col xs={4}>
                            <CartTotal id={"cartTotal"} orderType={orderType} onChange={(type) => setOrderType(type)} subtotal={subtotal}></CartTotal>
                        </Col>
                    </Row>

                    <Button onClick={makeOrder}>Place Order</Button>

                    <LoginModal show={showPopup} onClose={handleClose} loginScreen={true}></LoginModal>

                </div>

                {/*<CartTotal cart={cart}></CartTotal>*/}
            </main>
        </div>
    }






}

export default CartPage;
