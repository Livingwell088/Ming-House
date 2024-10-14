import {useEffect, useState} from "react";
import API from "../api";
import CartItem from "../components/CartItem";
import MenuPopup from "../components/MenuPopup";


const CartPage = (props) => {
    const [cart, setCart] = useState([]);
    const [fullMenu, setFullMenu] = useState([[]])



    const updateCart = async () => {
        console.log("Updating Cart")
        setCart([]);
        setTimeout(() => {
            API.orderAPI.get()
                .then((res) => setCart(res.data))
                .catch((error) => console.log(error.message))
        })
    }




    const getFull = (number) => {
        API.menuAPI.getByNumber(number)
            .then(r => {setFullMenu(r.data)})
            .catch((error) => console.log(error.message))
    }

    useEffect( () => {



        const testing = async () => {
            await API.orderAPI.get()
                .then((data) => data.data)
                .then(async (data) => {
                    // console.log(data)

                    let full = []
                    for (let i = 0; i < data.length; i++) {
                        const number = data[i].item.number;

                        await API.menuAPI.getByNumber(number)
                            .then((res) => res.data)
                            .then((res) => full.push(res))
                            .catch((error) => console.log(error.message))

                    }

                    setCart(data);
                    setFullMenu(full);

                    // let current = [];
                    // for (let i = 0; i < cart.length; i++){
                    //     API.menuAPI.getByNumber(cart[i].item.number)
                    //         .then(r => {
                    //             console.log(r.data)
                    //             current.push(r.data)
                    //         })
                    //         .catch((error) => console.log(error.message))
                    // }
                    //
                    // setFullMenu(current)
                })
                .catch((error) => console.log(error.message))
        }



        testing()



    }, [])






    return <div className="App teko">
        <main>

            <div>{cart.map((item, index) => {

                return <><CartItem id={item.id} name={item.orderName} price={item.orderPrice} item={item.item} order={item} updateCart={updateCart} full={fullMenu[index]}></CartItem>
                </>


            })}

            </div>

        </main>
    </div>


}

export default CartPage;
