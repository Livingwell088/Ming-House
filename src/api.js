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

const dayHours = {0: {"open" : "12:00", "close": "22:30"},
    1: {"open" : "11:00", "close": "22:30"},
    2: {"open" : "11:00", "close": "22:30"},
    3: {"open" : "11:00", "close": "22:30"},
    4: {"open" : "11:00", "close": "22:30"},
    5: {"open" : "11:00", "close": "23:00"},
    6: {"open" : "11:00", "close": "23:00"},

}

const isBetweenHours = (start, end, current) => {

    const startHour = parseInt(start.split(":")[0])
    const endHour = parseInt(end.split(":")[0])
    const currentHour = parseInt(current.split(":")[0])

    const startMin = parseInt(start.split(":")[1])
    const endMin = parseInt(end.split(":")[1])
    const currentMin = parseInt(current.split(":")[1])

    if (endHour < currentHour){
        return false
    }
    else {
        if (currentHour === endHour){
            if (endMin - currentMin < 30){
                return false
            }
        }

    }

    return true
}

const addToTimes = (current, end, want) => {

    const wantHour = parseInt(want.split(":")[0])
    const endHour = parseInt(end.split(":")[0])
    const currentHour = parseInt(current.split(":")[0])

    const wantMin = parseInt(want.split(":")[1])
    const endMin = parseInt(end.split(":")[1])
    const currentMin = parseInt(current.split(":")[1])

    if (currentHour > wantHour || endHour < wantHour){
        return false
    }
    else {
        if (wantHour === endHour){
            // console.log(want)
            // console.log(current)
            if (endMin - wantMin < 30){
                return false
            }
        }
        else if (currentHour === wantHour){
            if (wantMin - currentMin < 20){
                return false
            }
        }
    }
    return true

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
        },

        cartLogin: async(cartId, username) => {

            return await Api().post("carts/cartLogin/" + username, cartId, {
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "text/plain",
                },
                timeout: 10000,
            })
        }
    },

    orderAPI: {
        create: async (orderName, orderPrice, orderType, address, username, orderItems) => {

            let user = {}

            await API.userAPI.getUser(username)
                .then(r => {
                    user = r.data
                    console.log(r.data)
                })
                .catch((error) => console.log(error.message))

            console.log("GetUser: " + user)


            let order = {
                orderName: orderName,
                orderPrice: orderPrice,
                orderType: orderType,
                address: address,
                user: user,
                items: orderItems
            }

            return await Api().post("/orders/placeOrder", {...order}, {
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
    },

    userAPI: {
        create: async(usernameId, password, firstName, lastName, email, isGuest) => {

            let user = {
                usernameId: usernameId,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                guest: isGuest
            }

            return await Api().post("/users/add", {...user}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })
        },

        get: async() => {

            const result = await (Api().get("/users/getAllUsers"))
            // console.log(result.data)

            return result //.data
        },

        validate: async(user, pass) => {

            let current = {
                usernameId: user,
                password: pass
            }
            return await Api().post("/users/validate", {...current}, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })

        },

        getUser: async(userId) => {

            return await Api().get("/users/getUser/" + userId, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            })
        }
    },
    timeAPI: {
        get: () => {
            const date = new Date();
            const currentTime = date.getHours()
                + ':' + date.getMinutes()

            const hours = ["ASAP"]

            const todaysHour = dayHours[(date.getDay())]

            if (isBetweenHours(todaysHour.open, todaysHour.close, currentTime)){

                let current = date.getHours()

                while (current <= parseInt(todaysHour.close.split(":")[0])){
                    // console.log(current + ":00")
                    // console.log(current + ":30")

                    if (addToTimes(currentTime, todaysHour.close, current + ":00")){
                        if (current > 12){
                            hours.push((current - 12) + ":00 PM")
                        }
                        else{
                            hours.push(current + ":00 AM")
                        }

                    }
                    if (addToTimes(currentTime, todaysHour.close, current + ":30")){
                        if (current > 12){
                            hours.push((current - 12) + ":30 PM")
                        }
                        else{
                            hours.push(current + ":30 AM")
                        }


                    }

                    current++
                }
            }


            // console.log(hours)

            return hours;
        }
    }
}


export default API;