import {useEffect, useState} from "react";
import API from "../api";
import CartItem from "../components/CartItem";
import MenuPopup from "../components/MenuPopup";
import CartTotal from "../components/CartTotal";
import {Button, Col, Row} from "react-bootstrap";
import '../styles/fonts.css';


const CartPage = (props) => {
    const [cart, setCart] = useState([]);
    const [fullMenu, setFullMenu] = useState([[]])
    const [subtotal, setSubtotal] = useState(0.0)





    const testing = async () => {
        await API.cartAPI.get(sessionStorage.getItem("sessionId"))
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

    const makeOrder = async () => {
        await API.orderAPI.create("Test", 10.0, cart)
            .then(r => console.log(r))
            .catch((error) => console.log(error.message))
    }




    useEffect( () => {

        testing()

    }, [cart, subtotal, fullMenu])



    if (cart.length === 0){
        return <div className="App teko">
            <main>
                <div>

                    <h3>No Items in Cart</h3>
                    <h4>Browse Menu</h4>
                </div>
            </main>
        </div>
    }

    else{
        return <div className="App teko">
            <main>
                <div>
                    <Row>
                        <Col xs={9}>

                            {cart.map((item, index) => {

                                return <><CartItem id={item.id} name={item.orderName} price={item.orderPrice} item={item.item} order={item} updateCart={updateCart} full={fullMenu[index]}></CartItem>
                                </>


                            })}
                        </Col>
                        <Col xs={3}>
                            <CartTotal subtotal={subtotal}></CartTotal>
                        </Col>
                    </Row>

                    <Button onClick={makeOrder}>Place Order</Button>

                </div>

                {/*<CartTotal cart={cart}></CartTotal>*/}
            </main>
        </div>
    }






}

export default CartPage;
