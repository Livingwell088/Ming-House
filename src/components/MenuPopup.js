import MenuCard from "./MenuCard";
import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import Image from 'react-bootstrap/Image';
import "../styles/menuPopup.css"

// import dumpling from "/"

const MenuPopup = (props) => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let sizes = props.size.split(",")
    let prices = props.price.split(",")
    for (let i = 0; i < sizes.length; i++){
        if (sizes[i] === ""){
            sizes[i] += "$" + prices[i]
        }
        else if (sizes[i][0] !== "("){
            sizes[i] = ("(" + sizes[i] + "): $" + prices[i])
        }
        else{
            sizes[i] += ": $" + prices[i]
        }
    }


    if (sizes.length < 2){
    }

    else if (sizes.length === 2) {
    }


    return (
        <>


            <Modal show={props.show}
                   onHide={props.close}
                   backdrop="static"
                   keyboard={false}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   className={"popup"}
                >

                <Modal.Header closeButton={true}>
                    {/*{console.log(show)}*/}
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Image src={"/images/" + props.number + ".png"} className={"menuImg"} rounded />
                </Modal.Body>
                {sizes.map(current => {
                    // console.log(current)
                    return <Modal.Body className={current}>{current}</Modal.Body>;

                })}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>


            </Modal>
        </>
    )
}


export default MenuPopup;