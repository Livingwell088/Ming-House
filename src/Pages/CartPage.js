import {useEffect, useState} from "react";
import API from "../api";
import CartItem from "../components/CartItem";
import MenuPopup from "../components/MenuPopup";


const CartPage = (props) => {
    const [cart, setCart] = useState([]);


    const updateCart = () => {
        setCart([]);
        setTimeout(() => {
            API.orderAPI.get()
                .then((res) => setCart(res.data))
                .catch((error) => console.log(error.message))
        })
    };

    useEffect( () => {

        API.orderAPI.get()
            .then((data) => {
                console.log(data)
                setCart(data.data)
            })
            .catch((error) => console.log(error.message))
    }, [])




    return <div className="App teko">
        <main>

            <div>{cart.map((item) => {
                return <><CartItem id={item.id} name={item.orderName} price={item.orderPrice} item={item.item} order={item} updateCart={updateCart} ></CartItem>
                </>


            })}

            </div>

        </main>
    </div>


}

export default CartPage;
