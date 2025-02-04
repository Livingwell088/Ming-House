import {useEffect, useState} from "react";
import API from "../api";
import {Button, Col, Dropdown, FloatingLabel, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";


const CheckoutLeft = (props) => {


    const [user, setUser] = useState(props.user)

    const [fields, setFields] = useState(props.fields)
    const [orderType, setOrderType] = useState(props.orderType)

    const [dropdown, setDropdown] = useState("Time")





    useEffect(() => {
        setOrderType(props.orderType)
        setUser(props.user)
        setFields(props.fields)
    }, [props.orderType, props.user, props.fields]);


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
                            onChange={props.handleChangeUser}
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
                            onChange={props.handleChangeUser}
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
                            onChange={props.handleChangeUser}
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
                            onChange={props.handleChangeFields}
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
                                onChange={props.handleChangeFields}
                                placeholder={"Address"}
                                required
                            />
                        </FloatingLabel>
                    }
                </Col>
            </Row>


        </form>


    </>

}




export default CheckoutLeft;