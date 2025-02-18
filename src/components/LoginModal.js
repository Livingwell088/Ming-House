import {Button, Col, FloatingLabel, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import API from "../api";
import "../styles/menuPopup.css"
import Form from 'react-bootstrap/Form';
import ErrorAlert from "./ErrorAlert";



const LoginModal = (props) => {

    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("Login")
    const [loginScreen, setLoginScreen] = useState(props.loginScreen)
    // const onChange = (event) => setInstructions(event.target.value);


    const [inputs, setInputs] = useState({"username": "", "password": "", "passwordConfirm": "", "firstName": "", "lastName": "", "email": ""})

    const [passwordMatch, setMatch] = useState(false)

    const [passReq, setPassReq] = useState(false)
    const [validated, setValidated] = useState(false);

    const [showError, setShowError] = useState(false)
    const [errorHeading, setErrorHeading] = useState("")
    const [errorContent, setErrorContent] = useState("")


    useEffect(() => {
        setLoginScreen(props.loginScreen)
    }, [props.loginScreen]);

    const handleRefresh = () => {
        window.location.reload()
    }

    const closeModal = () => {
        clearStates()
        setValidated(false)
        props.onClose()
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}))

    }

    const clearStates = () => {
        setInputs({"username": "", "password": "", "passwordConfirm": "", "firstName": "", "lastName": "", "email": ""})
    }

    const handleGuest = () => {

        const current = window.sessionStorage.getItem("sessionId")
        API.userAPI.create(current, "", "", "", "", true)
            .then(r => console.log(r))
            .catch((error) => console.log(error.message))

        window.sessionStorage.setItem("loggedIn", "true")
        window.sessionStorage.setItem("username", current)

        // props.onClose()
        closeModal()
        handleRefresh()

    }

    const handleLogIn = (event) => {
        // console.loginScreen(inputs)

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        else{
            console.log("Check Valid")
            setValidated(true)


            API.userAPI.validate(inputs.username, inputs.password)
                .then(r => {
                    if (r.data === "Match"){
                        window.sessionStorage.setItem("username", inputs.username)
                        window.sessionStorage.setItem("loggedIn", "true")


                        closeModal()
                        handleRefresh()
                    }
                    else if (r.data === "Incorrect Password"){
                        setErrorHeading("Error")
                        setErrorContent("Incorrect Username or Password")
                        setShowError(true)

                    }
                    else{
                        setErrorHeading("Error")
                        setErrorContent("Username Does Not Exist. You Can Create An Account By Pressing Sign Up Below.")
                        setShowError(true)

                    }
                })
                .then(() => {
                    clearStates()

                    if (window.sessionStorage.getItem("loggedIn") === "true"){
                        console.log("Should be CartLogin")
                        API.cartAPI.cartLogin(window.sessionStorage.getItem("sessionId"), window.sessionStorage.getItem("username"))
                            .then(r => console.log(r))
                            .catch((error) => console.log(error.message))

                        // window.sessionStorage.setItem("sessionId", window.sessionStorage.getItem("username"))
                    }

                })
                .catch((error) => console.log(error.message))

        }


    }

    const handleSignUp = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false || inputs.password !== inputs.passwordConfirm) {
            event.preventDefault();
            setValidated(true)
            event.stopPropagation();
        }
        else{
            setValidated(true)



            if (inputs.password !== inputs.passwordConfirm){
                alert("Passwords Must Match!")
                clearStates()
            }

            else{
                API.userAPI.create(inputs.username, inputs.password, inputs.firstName, inputs.lastName, inputs.email, false)
                    .then(r => console.log(r))
                    .then(() => handleRefresh)
                    .catch((error) => console.log(error.message))
            }

        }

    }

    const passwordIsValid = inputs.password.length >= 8;

    const validSignUp = () => {

        return inputs.username !== "" && inputs.password !== "" && inputs.firstName !== "" && inputs.lastName !== "" && inputs.email !== "" && inputs.passwordConfirm !== "";
    }

    return <>

        <Modal
            show={props.show}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={"popup teko"}
            onClick={e => e.stopPropagation()}
        >

            <Modal.Header closeButton={true}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showError && <ErrorAlert heading={errorHeading} content={errorContent} onClose={() => setShowError(false)} />}


                {loginScreen && <Form validated={validated}>

                    <FloatingLabel
                        label={"Username"}
                        controlId={"floatingInput"}
                        style={{width: "60%"}}
                    >
                        <Form.Control
                            type="text"
                            name="username"
                            value={inputs.username || ""}
                            onChange={handleChange}
                            placeholder={"Username"}
                            style={{width: "100%"}}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Enter Your Username.
                        </Form.Control.Feedback>
                    </FloatingLabel>



                    <br />

                    <FloatingLabel
                        label={"Password"}
                        controlId={"floatingPassword"}
                        style={{width: "60%"}}
                    >
                        <Form.Control
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                            placeholder={"Password"}
                            style={{width: "100%"}}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Enter Your Password.
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <br />
                    <br />

                    <Button onClick={handleLogIn}>Log In</Button>

                    <a onClick={() => {
                        setLoginScreen(!loginScreen)
                        setTitle("Sign Up")
                    }}>
                        <p>Sign Up</p></a>

                    <hr />


                    <Button onClick={handleGuest}> Continue as Guest</Button>
                </Form>}





                {!loginScreen && <Form validated={validated}
                >

                    <Row>
                        <Col>
                            <FloatingLabel
                                label={"First Name"}
                                controlId={"floatingInput"}
                                style={{width: "90%"}}
                            >
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={inputs.firstName || ""}
                                    onChange={handleChange}
                                    placeholder={"First Name"}
                                    style={{width: "100%"}}
                                    required
                                />

                                <Form.Control.Feedback type="invalid">
                                    First Name Required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>

                        <Col>
                            <FloatingLabel
                                label={"Last Name"}
                                controlId={"floatingInput"}
                                style={{width: "90%"}}
                            >
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={inputs.lastName || ""}
                                    onChange={handleChange}
                                    placeholder={"Last Name"}
                                    style={{width: "100%"}}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Last Name Required
                                </Form.Control.Feedback>

                            </FloatingLabel>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col>
                            <FloatingLabel
                                label={"Email"}
                                controlId={"floatingInput"}
                                style={{width: "90%"}}
                            >
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    placeholder={"Email"}
                                    style={{width: "100%"}}
                                    required
                                />

                                <Form.Control.Feedback type="invalid">
                                    Valid Email Required
                                </Form.Control.Feedback>
                            </FloatingLabel>

                        </Col>
                        <Col></Col>
                    </Row>



                    <br />

                    <Row>
                        <Col>
                            <FloatingLabel
                                label={"Username"}
                                controlId={"floatingInput"}
                                style={{width: "90%"}}
                            >
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={inputs.username || ""}
                                    onChange={handleChange}
                                    placeholder={"Username"}
                                    style={{width: "100%"}}
                                    required
                                />

                                <Form.Control.Feedback type="invalid">
                                    Username Required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>

                        <Col></Col>
                    </Row>

                    <br />

                    <Row>
                        <Col>
                            <FloatingLabel
                                label={"Password"}
                                controlId={"floatingPassword"}
                                style={{width: "90%"}}
                            >
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    placeholder={"Password"}
                                    style={{width: "100%"}}
                                    isInvalid={(inputs.password === "0")}
                                    // isValid={false}
                                    required
                                />

                                <Form.Control.Feedback type="invalid">
                                    Password Required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>

                        <Col>
                            <FloatingLabel
                                label={"Confirm Password"}
                                controlId={"floatingPassword"}
                                style={{width: "90%"}}
                            >
                                <Form.Control
                                    type="password"
                                    name="passwordConfirm"
                                    value={inputs.passwordConfirm || ""}
                                    onChange={handleChange}
                                    placeholder={"Confirm Password"}
                                    style={{width: "100%"}}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Confirm Password Required
                                </Form.Control.Feedback>
                            </FloatingLabel>

                        </Col>
                    </Row>



                    <br />

                    <Button onClick={handleSignUp} disabled={!(inputs.username !== "" && inputs.password !== "" && inputs.firstName !== "" && inputs.lastName !== "" && inputs.email !== "" && inputs.passwordConfirm !== "")}>Sign Up</Button>

                    <a onClick={() => {
                        setLoginScreen(!loginScreen)
                        setTitle("Login")
                    }}>
                        <p>Back to Log In</p></a>
                </Form>}





            </Modal.Body>
        </Modal>
    </>

}



export default LoginModal;

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
//
// function FormExample() {
//     const [validated, setValidated] = useState(false);
//
//     const handleSubmit = (event) => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         setValidated(true);
//     };
//
//     return (
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Form.Group md="4" controlId="validationCustom01">
//                     <Form.Label>First name</Form.Label>
//                     <Form.Control
//                         required
//                         type="text"
//                         placeholder="First name"
//                         defaultValue="Mark"
//                     />
//                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//             <Button type="submit">Submit form</Button>
//         </Form>
//     );
// }
//
// export default FormExample;