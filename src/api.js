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
            console.log(result.data)

            return result //.data
        },
    },
    orderAPI: {

        // String orderName, Double orderPrice, Integer quantity, Menu item, String specialInstruction
        create: async (orderName, orderPrice, quantity, item, specialInstruction) => {
            let order = {
                // id: id,
                orderName: orderName,
                orderPrice: orderPrice,
                quantity: quantity,
                item: item,
                specialInstruction: specialInstruction
            };

            console.log({...order})

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
            console.log(result.data)

            return result //.data
        },
        edit: async (id, orderName, orderPrice, quantity, item, specialInstruction) => {
            let order = {
                id: id,
                orderName: orderName,
                orderPrice: orderPrice,
                quantity: quantity,
                item: item,
                specialInstruction: specialInstruction
            };

            console.log({...order})

            return await Api().put("/orders/" + id, {...order}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })
        },
        delete: async (id) => {
            return await Api().delete("/orders/" + id);
        },
    }
}


export default API;