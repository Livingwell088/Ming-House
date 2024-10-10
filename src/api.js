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
    menuAPI: {
        get: async () => {
            const result = await (Api().get("/menu/getMenu"))
            console.log(result.data)

            return result //.data
        },
    },
    orderAPI: {
        create: async (orderName, orderPrice, orderAmount, quantity, item) => {
            let order = {
                // id: id,
                orderName: orderName,
                orderPrice: orderPrice,
                orderAmount: orderAmount,
                quantity: quantity,
                item: item,
            };

            console.log({ ...order })

            return await Api().post("/orders/add", { ...order },  {
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
    }
}


export default API;