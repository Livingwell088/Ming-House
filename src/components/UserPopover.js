import {OverlayTrigger, Popover} from "react-bootstrap";
import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import API from "../api";
import LoginModal from "./LoginModal";


const UserPopover = (props) => {

    const [log, setLog] = useState(window.sessionStorage.getItem("loggedIn"))
    const [username, setUsername] = useState(window.sessionStorage.getItem("username"))
    const [user, setUser] = useState({})
    const [guest, setGuest] = useState(true)


    const [showPopup, setShowPopup] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);


    const clickLogin = () => {
        setShowLogin(true)
        handleShow()
        console.log(showLogin)


    }

    const clickSignUp = () => {
        setShowLogin(false)
        handleShow()
        console.log(showLogin)

    }

    const getUser = async () => {
        setLog(window.sessionStorage.getItem("loggedIn"))
        setUsername(window.sessionStorage.getItem("username"))


        await API.userAPI.getUser(username)
            .then(async r => {
                await setUser(r.data)

                if (log === "true") {

                    if (user.firstName === user.lastName && user.email === user.usernameId && user.firstName === user.email) {
                        setGuest(true)
                    } else if (user === {}) {
                        setGuest(true)
                    } else {
                        setGuest(false)
                    }
                }
            })
            .catch((error) => console.log(error))

        // console.log(user)


    }

    // useEffect(() => {
    //     console.log(window.sessionStorage.getItem("loggedIn"))
    // }, []);

    const popover = (<Popover>
        <Popover.Header>
            <h3>Hello, {user.firstName || "Customer"}</h3>
        </Popover.Header>

        <Popover.Body>
            {guest &&
                <div>
                    <Button onClick={clickLogin}>Login</Button>
                    <p>Don't have an account? <a onClick={clickSignUp}> Sign Up for one. </a> </p>

                    <LoginModal  show={showPopup} onClose={handleClose} loginScreen={showLogin}></LoginModal>
                </div>

                // <p>Log in to your account or Sign Up</p>
            }

        </Popover.Body>
    </Popover>)
    // <UserPopover />

    return <>

        <OverlayTrigger overlay={popover} placement={"bottom"} trigger={"click"}>
            <a onClick={getUser}>
                <p className={"navtext"}>User</p>
            </a>

        </OverlayTrigger>

    </>

}



export default UserPopover;