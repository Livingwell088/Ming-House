import {useEffect, useState} from "react";
import API from "../api";


const CartPage = (props) => {
    const [cart, setCart] = useState([]);


    useEffect( () => {

        API.orderAPI.get()
            .then((data) => {
                console.log(data)
                setCart(data.data)
            })
            .catch((error) => console.log(error.message))




        // let order = {
        //     id: id,
        //     orderName: orderName,
        //     orderPrice: orderPrice,
        //     orderAmount: orderAmount,
        //     quantity: quantity,
        //     item: item,
        // };


        // let id = "1"
        // let orderName = "Test"
        // let orderPrice = 3.95
        // let orderAmount = 2
        // let quantity = 2
        //
        // let item = {
        //     "id": "10",
        //     // "number": "9",
        //     // "name": "Crab Rangoon",
        //     // "size": "(Sm 6)",
        //     // "category": "Appetizer",
        //     // "price": "5.95",
        //     // "spicy": "0"
        // }
        //
        // API.orderAPI.create(
        //     id,
        //     orderName,
        //     orderPrice,
        //     orderAmount,
        //     quantity,
        //     item,
        // ).then(r => console.log(r))
        //     .catch((error) => console.log(error))
        //


    }, [])


    return (<>
        <div>{cart.map((item) => {
            return item.id
        })}</div>
    </>)


}

export default CartPage;
