import axios from "axios";

let apiToken = null;
let apiTokenFetchTime = new Date();

function Api() {
    const axiosConfig = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        timeout: 10000,
    };
    axiosConfig.baseURL = "http://localhost:8080";
    return axios.create(axiosConfig);
}


async function checkToken(){
    return apiToken;
}


const API = {
    priceAPI: {
        price: (price) => {
            return price.toFixed(2);
        }
    },
    menuAPI: {
        get: async () => {
            const result = await (Api().get("/menu/getMenu"))
            // console.log(result.data)

            return result //.data
        },
        getByNumber: async (number) => {

            const result = await (Api().get("/menu/numbers/" + number))
            // console.log(result.data)

            return result;
        }
    },
    cartAPI: {

        // String cartName, Double cartPrice, Integer quantity, Menu item, String specialInstruction
        create: async (cartName, cartPrice, quantity, item, cartId, specialInstruction) => {
            let cart = {
                // id: id,
                orderName: cartName,
                orderPrice: cartPrice,
                quantity: quantity,
                item: item,
                cartId: cartId,
                specialInstruction: specialInstruction
            };

            // console.log({...cart})

            return await Api().post("/carts/add", {...cart}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })

        },
        get: async (cartId) => {
            const result = await (Api().get("/carts/getCarts/" + cartId))
            // console.log(result.data)

            return result //.data
        },
        edit: async (id, cartName, cartPrice, quantity, item, specialInstruction, cartId) => {
            let cart = {
                id: id,
                orderName: cartName,
                orderPrice: cartPrice,
                quantity: quantity,
                item: item,
                cartId: cartId,
                specialInstruction: specialInstruction
            };

            // console.log({...cart})

            return await Api().put("/carts/" + cartId, {...cart}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })
        },
        // delete: async (id) => {
        //     return await Api().delete("/carts/" + id);
        // },

        delete: async (cartName, cartPrice, quantity, item, cartId, specialInstruction) => {
            let cart = {
                // id: id,
                orderName: cartName,
                orderPrice: cartPrice,
                quantity: quantity,
                item: item,
                cartId: cartId,
                specialInstruction: specialInstruction
            };

            return await Api().post("/carts/delete", {...cart}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })
        },
        generate: async () => {

            const result = await (Api().get("/carts/generate"))

            return result
        }
    },

    orderAPI: {
        create: async (orderName, orderPrice, orderItems) => {

            let order = {
                orderName: orderName,
                orderPrice: orderPrice,
                orderItems: orderItems
            }

            return await Api().post("/orders/add", {...order}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })

        },
        get: async () => {
            const result = await (Api().get("/orders/getOrders"))
            // console.log(result.data)

            return result //.data
        }
    }
}


export default API;