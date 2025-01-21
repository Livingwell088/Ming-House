import {Button, Col, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import API from "../api";
import "../styles/menuPopup.css"



const LoginModal = (props) => {

    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("Login")
    const [loginScreen, setLoginScreen] = useState(props.loginScreen)
    // const onChange = (event) => setInstructions(event.target.value);


    // const [firstName, setFirstName] = useState("")
    // const [lastName, setlastName] = useState("")
    // const [email, setemail] = useState("")
    // const [password, setpassword] = useState("")
    // const [passwordConfirm, setpasswordConfirm] = useState("")

    const [inputs, setInputs] = useState({"username": "", "password": "", "passwordConfirm": "", "firstName": "", "lastName": "", "email": ""})

    const [passwordMatch, setMatch] = useState(false)

    const [passReq, setPassReq] = useState(false)

    useEffect(() => {
        setLoginScreen(props.loginScreen)
    }, [props.loginScreen]);


    const closeModal = () => {
        clearStates()
        props.onClose()
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}))

        // if (!(inputs.password.includes("^[A-Za-z]*$") && inputs.password.includes("/[^0-9]/g") && inputs.password.length >= 8)){
        //     setPassReq(true)
        // }
        // else{
        //     setPassReq(false)
        // }

        // if ((inputs.password === inputs.passwordConfirm) && inputs.password !== ""){ //  && inputs.passwordConfirm !== ""
        //     setMatch(true)
        // }
        // else{
        //     setMatch(false)
        // }
    }

    const clearStates = () => {
        setInputs({"username": "", "password": "", "passwordConfirm": "", "firstName": "", "lastName": "", "email": ""})
        setLoginScreen(props.loginScreen)
    }

    const handleGuest = () => {

        const current = window.sessionStorage.getItem("sessionId")
        API.userAPI.create(current, "", current, current, current)
            .then(r => console.log(r))
            .catch((error) => console.log(error.message))

        window.sessionStorage.setItem("loggedIn", "true")
        window.sessionStorage.setItem("username", current)

        // props.onClose()
        closeModal()

    }

    const handleLogIn = () => {
        // console.loginScreen(inputs)

        API.userAPI.validate(inputs.username, inputs.password)
            .then(r => {
                if (r.data === "Match"){
                    window.sessionStorage.setItem("username", inputs.username)
                    window.sessionStorage.setItem("loggedIn", "true")



                    // clearStates()
                    // props.onClose()

                    closeModal()
                }
                else if (r.data === "Incorrect Password"){
                    alert("Incorrect Password")
                }
                else{
                    alert("Username/Email Do Not Exist")
                }
            })
            .then(() => {

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

    const handleSignUp = () => {
        console.log(inputs)
        console.log(passwordMatch)

        if (inputs.password !== inputs.passwordConfirm){
            alert("Passwords Must Match!")
            clearStates()
        }


        API.userAPI.create(inputs.username, inputs.password, inputs.firstName, inputs.lastName, inputs.email)
            .then(r => console.log(r))
            .catch((error) => console.log(error.message))
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

                {loginScreen && <form>
                    <label
                        style={{width: "60%"}}
                    >
                        <input
                            type="text"
                            name="username"
                            value={inputs.username || ""}
                            onChange={handleChange}
                            placeholder={"Username"}
                            style={{width: "100%"}}
                        />
                    </label>

                    <br />
                    <br />

                    <label style={{width: "60%"}}>
                        <input
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                            placeholder={"Password"}
                            style={{width: "100%"}}
                        />

                    </label>

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
                </form>}




                {!loginScreen && <form>

                    <Row>
                        <Col>
                            <label style={{width: "90%"}}>
                                <input type="text"
                                       name="firstName"
                                       value={inputs.firstName || ""}
                                       onChange={handleChange}
                                       placeholder={"First Name"}
                                       style={{width: "100%"}}
                                />

                            </label>
                        </Col>

                        <Col>
                            <label style={{width: "90%"}}>
                                <input type="text"
                                       name="lastName"
                                       value={inputs.lastName || ""}
                                       onChange={handleChange}
                                       placeholder={"Last Name"}
                                       style={{width: "100%"}}
                                />

                            </label>
                        </Col>
                    </Row>


                    {/*<br />*/}
                    <br />

                    <Row>
                        <Col>
                            <label style={{width: "90%"}}>
                                <input
                                    type="text"
                                    name="email"
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    placeholder={"Email"}
                                    style={{width: "100%"}}
                                />
                            </label>
                        </Col>
                        <Col></Col>
                    </Row>



                    <br />

                    <Row>
                        <Col>
                            <label style={{width: "90%"}}>
                                <input type="text"
                                       name="username"
                                       value={inputs.username || ""}
                                       onChange={handleChange}
                                       placeholder={"Username"}
                                       style={{width: "100%"}}
                                />

                            </label>
                        </Col>

                        <Col></Col>
                    </Row>

                    <br />

                    <Row>
                        <Col>
                            <label style={{width: "90%"}}>
                                <input type="password"
                                       name="password"
                                       value={inputs.password || ""}
                                       onChange={handleChange}
                                       placeholder={"Password"}
                                       style={{width: "100%"}}
                                />

                            </label>
                        </Col>

                        <Col>
                            <label style={{width: "90%"}}>
                                <input type="password"
                                       name="passwordConfirm"
                                       value={inputs.passwordConfirm || ""}
                                       onChange={handleChange}
                                       placeholder={"Confirm Password"}
                                       style={{width: "100%"}}
                                />

                            </label>
                        </Col>
                    </Row>



                    <br />

                    {passReq && <p> Password do no Match</p>}

                    <Button onClick={handleSignUp}>Sign Up</Button>

                    <a onClick={() => {
                        setLoginScreen(!loginScreen)
                        setTitle("Login")
                    }}>
                        <p>Sign Up</p></a>
                </form>}





            </Modal.Body>
        </Modal>
    </>

}



export default LoginModal;


