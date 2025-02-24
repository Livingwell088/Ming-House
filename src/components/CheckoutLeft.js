import {useEffect, useState} from "react";
import API from "../api";
import {Button, Col, Dropdown, FloatingLabel, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../styles/Checkout.css"


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

            <h2 style={{textAlign: "left"}}>Your Information</h2>
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

            <Row>
                <Col>
                    <FloatingLabel
                        className={"floatingLabel"}
                        label={"Special Instructions"}
                        controlId={"floatingTextarea"}
                        style={{width: "75%"}}
                    >

                        <Form.Control
                            className={"textInput"}
                            as={"textarea"}
                            name={"instruction"}
                            value={fields.instruction || ""}
                            onChange={props.handleChangeFields}
                            placeholder={"Special Instructions"}
                            style={{ height: '100px' }}
                            required
                        />
                    </FloatingLabel>

                </Col>
            </Row>

        </form>

        <div style={{textAlign: "left"}}>
            <h2>Your Cart</h2>

            <ul>
                {props.cart.map((item, index) => {
                    // console.log(item.specialInstruction);
                    return <li key={index}>{item.quantity} x {item.item.name} {item.item.size} ... ${API.priceAPI.price(item.orderPrice)}
                        {item.specialInstruction !== "" && <ul>
                            <li key={("ins" + index.toString())}>{item.specialInstruction}</li>
                        </ul>}
                    </li>
                })}
            </ul>
        </div>


    </>

}




export default CheckoutLeft;