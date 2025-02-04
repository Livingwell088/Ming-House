import {useEffect, useState} from "react";
import API from "../api";
import {Button, Col, Dropdown, FloatingLabel, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";


const CheckoutLeft = (props) => {


    const [inputs, setInputs] = useState({"username": "", "password": "", "passwordConfirm": "", "firstName": "", "lastName": "", "email": ""})
    const [currentUser, setCurrentUser] = useState({})

    const [user, setUser] = useState({})
    const [fields, setFields] = useState({"phoneNumber": "", "address": ""})
    const [orderType, setOrderType] = useState(props.orderType)

    const [dropdown, setDropdown] = useState("Time")

    const handleChangeUser = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUser(values => ({...values, [name]: value}))

    }

    const handleChangeField = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFields(values => ({...values, [name]: value}))
    }

    const getUser = async () => {
        let username = (window.sessionStorage.getItem("username"))

        await API.userAPI.getUser(username)
            .then(r => r.data)
            .then(r => setUser(r))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        setOrderType(props.orderType)
    }, [props.orderType]);


    useEffect(() => {
        getUser()

        // console.log(test)

    }, [currentUser]);

    return <>

        <form>

            <Row>
                <Col xs={5}>
                    <FloatingLabel
                        className={"floatingLabel"}
                        label={"First Name"}
                        controlId={"floatingInput"}
                        style={{width: "75%"}}
                    >
                        <Form.Control
                            className={"textInput"}
                            type={"text"}
                            name={"firstName"}
                            value={user.firstName || ""}
                            onChange={handleChangeUser}
                            placeholder={"First Name"}
                            required
                        />
                    </FloatingLabel>
                </Col>
                <Col xs={2}></Col>
                <Col xs={5}>
                    <FloatingLabel
                        className={"floatingLabel"}
                        label={"Last Name"}
                        controlId={"floatingInput"}
                        style={{width: "75%"}}
                    >
                        <Form.Control
                            className={"textInput"}
                            type={"text"}
                            name={"lastName"}
                            value={user.lastName || ""}
                            onChange={handleChangeUser}
                            placeholder={"Last Name"}
                            required
                        />
                    </FloatingLabel>
                </Col>
            </Row>



            <Row>
                <Col>
                    <FloatingLabel
                        className={"floatingLabel"}
                        label={"Email"}
                        controlId={"floatingInput"}
                        style={{width: "75%"}}
                    >
                        <Form.Control
                            className={"textInput"}
                            type={"text"}
                            name={"email"}
                            value={user.email || ""}
                            onChange={handleChangeUser}
                            placeholder={"Email"}
                            required
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FloatingLabel
                        className={"floatingLabel"}
                        label={"Phone Number"}
                        controlId={"floatingInput"}
                        style={{width: "75%"}}
                    >
                        <Form.Control
                            className={"textInput"}
                            type={"text"}
                            name={"phoneNumber"}
                            value={fields.phoneNumber || ""}
                            onChange={handleChangeField}
                            placeholder={"Phone Number"}
                            required
                        />
                    </FloatingLabel>
                </Col>
            </Row>


            <Row>
                <Col>
                    {(orderType === " Delivery") &&
                        <FloatingLabel
                            label={"Address"}
                            controlId={"floatingInput"}
                            style={{width: "75%"}}
                        >
                            <Form.Control
                                type={"text"}
                                name={"address"}
                                value={fields.address || ""}
                                onChange={handleChangeField}
                                placeholder={"Address"}
                                required
                            />
                        </FloatingLabel>
                    }
                </Col>
            </Row>









        </form>

        <Button onClick={() => console.log(user)}></Button>


    </>

}




export default CheckoutLeft;